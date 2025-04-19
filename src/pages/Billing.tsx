import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Plus,
  X,
  Trash,
  FileText,
  Download,
  Printer,
  Send,
  ReceiptText,
  QrCode,
  ScanLine
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { WhatsAppShareModal } from "@/components/features/WhatsAppShareModal";

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  mrp: number;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  hsnCode: string;
}

interface BillItem extends InventoryItem {
  quantity: number;
}

const inventoryItems: InventoryItem[] = [
  {
    id: 1,
    name: "Samsung Galaxy S21",
    category: "Electronics",
    mrp: 69999,
    purchasePrice: 58000,
    sellingPrice: 64999,
    stock: 15,
    hsnCode: "85171290",
  },
  {
    id: 2,
    name: "Nike Air Max",
    category: "Clothing",
    mrp: 12999,
    purchasePrice: 8500,
    sellingPrice: 11999,
    stock: 8,
    hsnCode: "64041900",
  },
  {
    id: 3,
    name: "Logitech MX Master Mouse",
    category: "Electronics",
    mrp: 10999,
    purchasePrice: 7200,
    sellingPrice: 9999,
    stock: 22,
    hsnCode: "84716090",
  },
  {
    id: 4,
    name: "Sony WH-1000XM4 Headphones",
    category: "Electronics",
    mrp: 29999,
    purchasePrice: 22000,
    sellingPrice: 27999,
    stock: 5,
    hsnCode: "85183000",
  },
  {
    id: 5,
    name: "Dettol Hand Sanitizer",
    category: "Health & Beauty",
    mrp: 250,
    purchasePrice: 180,
    sellingPrice: 230,
    stock: 50,
    hsnCode: "38089490",
  },
];

const GST_RATES: { [key: string]: number } = {
  "Electronics": 18, // 18% GST for electronics
  "Clothing": 5,    // 5% GST for clothing
  "Health & Beauty": 12, // 12% GST for health and beauty products
  "default": 18     // Default GST rate
};

export default function Billing() {
  const [search, setSearch] = useState("");
  const [showQrScannerDialog, setShowQrScannerDialog] = useState(false);
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [searchResults, setSearchResults] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showProfitInfo, setShowProfitInfo] = useState(true);
  
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    
    setBillNumber(`INV-${year}${month}${day}-${random}`);
  }, []);
  
  useEffect(() => {
    if (search) {
      const filtered = inventoryItems.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [search]);
  
  const handleAddItem = (item: InventoryItem) => {
    const existingItem = billItems.find(i => i.id === item.id);
    
    if (existingItem) {
      const updatedItems = billItems.map(i => 
        i.id === item.id 
          ? { ...i, quantity: i.quantity + quantity } 
          : i
      );
      setBillItems(updatedItems);
    } else {
      setBillItems([...billItems, { ...item, quantity }]);
    }
    
    setSearch("");
    setSearchResults([]);
    setSelectedItem(null);
    setQuantity(1);
    toast.success(`Added ${item.name} to bill`);
  };
  
  const handleRemoveItem = (id: number) => {
    setBillItems(billItems.filter(item => item.id !== id));
  };
  
  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) return;
    
    const updatedItems = billItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setBillItems(updatedItems);
  };
  
  const calculateSubtotal = () => {
    return billItems.reduce((sum, item) => sum + (item.sellingPrice * item.quantity), 0);
  };
  
  const calculateGST = () => {
    return billItems.reduce((sum, item) => {
      const gstRate = GST_RATES[item.category] || GST_RATES.default;
      const itemSubtotal = item.sellingPrice * item.quantity;
      const itemGST = itemSubtotal * (gstRate / 100);
      return sum + itemGST;
    }, 0);
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };
  
  const calculateProfit = () => {
    return billItems.reduce((sum, item) => {
      const itemProfit = (item.sellingPrice - item.purchasePrice) * item.quantity;
      return sum + itemProfit;
    }, 0);
  };
  
  const saveBill = () => {
    if (billItems.length === 0) {
      toast.error("Please add items to the bill");
      return;
    }
    
    const bill = {
      billNumber,
      customerName,
      customerPhone,
      items: billItems,
      subtotal: calculateSubtotal(),
      gst: calculateGST(),
      total: calculateTotal(),
      profit: calculateProfit(),
      date: new Date().toISOString(),
    };
    
    const existingBills = JSON.parse(localStorage.getItem("bills") || "[]");
    
    const updatedBills = [bill, ...existingBills];
    
    localStorage.setItem("bills", JSON.stringify(updatedBills));
    
    toast.success("Bill saved successfully!");
    
    setBillItems([]);
    setCustomerName("");
    setCustomerPhone("");
    
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    
    setBillNumber(`INV-${year}${month}${day}-${random}`);
  };
  
  return (
    <div className="content-container">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground">Create and manage customer bills</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Create New Bill
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer-name">Customer Name</Label>
                    <Input 
                      id="customer-name" 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-phone">Phone Number</Label>
                    <Input 
                      id="customer-phone" 
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bill-number">Bill Number</Label>
                  <Input 
                    id="bill-number" 
                    value={billNumber} 
                    readOnly 
                    className="bg-muted"
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search for items..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <Button onClick={() => setShowQrScannerDialog(true)}>
                      <QrCode className="h-4 w-4 mr-2" />
                      Scan
                    </Button>
                  </div>
                  
                  {searchResults.length > 0 && (
                    <div className="border rounded-md max-h-60 overflow-y-auto">
                      <ul className="py-1">
                        {searchResults.map((item) => (
                          <li key={item.id} className="px-4 py-2 hover:bg-muted cursor-pointer" onClick={() => setSelectedItem(item)}>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-xs text-muted-foreground">{item.category}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">₹{item.sellingPrice}</p>
                                <p className="text-xs text-muted-foreground">Stock: {item.stock}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedItem && (
                    <div className="border rounded-md p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{selectedItem.name}</p>
                        <p className="text-sm text-muted-foreground">₹{selectedItem.sellingPrice} per unit</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <span className="w-10 text-center">{quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button onClick={() => handleAddItem(selectedItem)}>Add</Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Bill Items</h3>
                  
                  {billItems.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No items added to the bill yet.</p>
                      <p className="text-sm">Search for items to add them to the bill.</p>
                    </div>
                  ) : (
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-4 py-2 text-left font-medium">Item</th>
                            <th className="px-4 py-2 text-center font-medium">Qty</th>
                            <th className="px-4 py-2 text-right font-medium">Price</th>
                            <th className="px-4 py-2 text-right font-medium">Total</th>
                            <th className="px-4 py-2 text-center font-medium">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {billItems.map((item) => (
                            <tr key={item.id} className="border-t">
                              <td className="px-4 py-2">{item.name}</td>
                              <td className="px-4 py-2">
                                <div className="flex items-center justify-center">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-6 w-6" 
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-6 w-6" 
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </td>
                              <td className="px-4 py-2 text-right">₹{item.sellingPrice}</td>
                              <td className="px-4 py-2 text-right">₹{item.sellingPrice * item.quantity}</td>
                              <td className="px-4 py-2 text-center">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-7 w-7"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ReceiptText className="h-5 w-5 text-primary" />
                Bill Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>₹{calculateSubtotal().toLocaleString()}</span>
                </div>
                
                {billItems.map((item) => {
                  const gstRate = GST_RATES[item.category] || GST_RATES.default;
                  const itemSubtotal = item.sellingPrice * item.quantity;
                  const itemGST = itemSubtotal * (gstRate / 100);
                  return (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.name} GST ({gstRate}%):</span>
                      <span>₹{itemGST.toLocaleString()}</span>
                    </div>
                  );
                })}
                
                <Separator />
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total GST:</span>
                  <span>₹{calculateGST().toLocaleString()}</span>
                </div>
                
                {showProfitInfo && (
                  <div className="flex justify-between mt-4 text-sm">
                    <span className="text-muted-foreground">Profit:</span>
                    <span className="text-smartventory-green">₹{calculateProfit().toLocaleString()}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Show profit info</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showProfitInfo} 
                    onChange={() => setShowProfitInfo(!showProfitInfo)} 
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-smartventory-purple"></div>
                </label>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full gap-2" onClick={saveBill}>
                  <FileText className="h-4 w-4" />
                  Save & Print Bill
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="gap-1">
                    <Download className="h-4 w-4" />
                    PDF
                  </Button>
                  <Button variant="outline" className="gap-1">
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full gap-2" 
                  onClick={() => setShowShareModal(true)}
                >
                  <Send className="h-4 w-4" />
                  Share via WhatsApp
                </Button>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Recent Bills</span>
                  <Badge variant="outline">
                    <Link to="/bill-history">View All</Link>
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="border rounded p-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">INV-2304{10 + index}</span>
                        <span className="text-muted-foreground">₹{(8500 + index * 1200).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-muted-foreground">Customer {index + 1}</span>
                        <span className="text-xs">Today</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Dialog open={showQrScannerDialog} onOpenChange={setShowQrScannerDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-primary" />
              Scan QR Code or Barcode
            </DialogTitle>
            <DialogDescription>
              Point your camera at a QR code or barcode to scan.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="border-2 border-dashed rounded-lg h-64 flex flex-col items-center justify-center">
              <ScanLine className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Camera preview will appear here</p>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Make sure the QR code or barcode is well-lit and centered in the frame
            </p>
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => setShowQrScannerDialog(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <WhatsAppShareModal
        open={showShareModal}
        onOpenChange={setShowShareModal}
        billId={billNumber}
        mode="bill"
      />
    </div>
  );
}

function Link({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <a href={to} className="text-smartventory-purple hover:underline">
      {children}
    </a>
  );
}
