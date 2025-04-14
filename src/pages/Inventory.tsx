
import { useState } from "react";
import { 
  Package, 
  Search, 
  Plus, 
  FileUp, 
  FileDown, 
  QrCode, 
  Filter, 
  Edit, 
  Trash,
  ChevronDown,
  ScanLine
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

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

const categories = [
  "Electronics",
  "Clothing",
  "Food & Beverages",
  "Home Appliances",
  "Furniture",
  "Sports & Fitness",
  "Books & Stationery",
  "Toys & Games",
  "Health & Beauty",
  "Automotive",
];

const initialItems: InventoryItem[] = [
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

export default function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [search, setSearch] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showQrScannerDialog, setShowQrScannerDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: "",
    category: "",
    mrp: 0,
    purchasePrice: 0,
    sellingPrice: 0,
    stock: 0,
    hsnCode: "",
  });
  
  const filteredItems = items.filter(
    (item) =>
      (search === "" || item.name.toLowerCase().includes(search.toLowerCase())) &&
      (selectedCategory === null || item.category === selectedCategory)
  );
  
  const handleAddItem = () => {
    if (!newItem.name || !newItem.category) {
      toast.error("Please enter item name and category");
      return;
    }
    
    const id = Math.max(0, ...items.map((item) => item.id)) + 1;
    
    setItems([...items, { ...newItem as InventoryItem, id }]);
    setNewItem({
      name: "",
      category: "",
      mrp: 0,
      purchasePrice: 0,
      sellingPrice: 0,
      stock: 0,
      hsnCode: "",
    });
    setShowAddDialog(false);
    toast.success("Item added successfully");
  };
  
  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
    toast.success("Item deleted successfully");
  };
  
  const calculateProfit = (item: InventoryItem) => {
    const profit = item.sellingPrice - item.purchasePrice;
    const profitPercentage = (profit / item.purchasePrice) * 100;
    return profitPercentage.toFixed(1) + "%";
  };
  
  return (
    <div className="content-container">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <p className="text-muted-foreground">Manage your product inventory</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                {selectedCategory || "Categories"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                All Categories
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuItem 
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={() => setShowQrScannerDialog(true)}>
            <QrCode className="h-4 w-4 mr-2" />
            Scan
          </Button>
          
          <Button variant="default" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="py-3 px-4 text-left font-medium">Name</th>
              <th className="py-3 px-4 text-left font-medium">Category</th>
              <th className="py-3 px-4 text-right font-medium">MRP</th>
              <th className="py-3 px-4 text-right font-medium">Purchase Price</th>
              <th className="py-3 px-4 text-right font-medium">Selling Price</th>
              <th className="py-3 px-4 text-right font-medium">Stock</th>
              <th className="py-3 px-4 text-right font-medium">Profit</th>
              <th className="py-3 px-4 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-muted-foreground">
                  No items found.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} className="border-t hover:bg-muted/20">
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{item.category}</td>
                  <td className="py-3 px-4 text-right">₹{item.mrp.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">₹{item.purchasePrice.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">₹{item.sellingPrice.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">{item.stock}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-smartventory-green">{calculateProfit(item)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Export/Import Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" className="gap-1">
          <FileUp className="h-4 w-4" />
          Import
        </Button>
        <Button variant="outline" className="gap-1">
          <FileDown className="h-4 w-4" />
          Export
        </Button>
      </div>
      
      {/* Add Item Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Add New Item
            </DialogTitle>
            <DialogDescription>
              Enter the details of the new inventory item.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-name">Item Name</Label>
                <Input
                  id="item-name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mrp">MRP</Label>
                <Input
                  id="mrp"
                  type="number"
                  value={newItem.mrp}
                  onChange={(e) => setNewItem({ ...newItem, mrp: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchase-price">Purchase Price</Label>
                <Input
                  id="purchase-price"
                  type="number"
                  value={newItem.purchasePrice}
                  onChange={(e) => setNewItem({ ...newItem, purchasePrice: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="selling-price">Selling Price</Label>
                <Input
                  id="selling-price"
                  type="number"
                  value={newItem.sellingPrice}
                  onChange={(e) => setNewItem({ ...newItem, sellingPrice: Number(e.target.value) })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={newItem.stock}
                  onChange={(e) => setNewItem({ ...newItem, stock: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hsn-code">HSN Code</Label>
                <Input
                  id="hsn-code"
                  value={newItem.hsnCode}
                  onChange={(e) => setNewItem({ ...newItem, hsnCode: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddItem}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* QR Scanner Dialog */}
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
    </div>
  );
}
