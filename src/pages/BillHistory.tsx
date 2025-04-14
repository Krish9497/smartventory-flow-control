
import { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Printer,
  Search,
  MessageSquare,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";
import { WhatsAppShareModal } from "@/components/features/WhatsAppShareModal";

interface BillItem {
  id: number;
  name: string;
  category: string;
  sellingPrice: number;
  purchasePrice: number;
  quantity: number;
}

interface Bill {
  billNumber: string;
  customerName: string;
  customerPhone: string;
  items: BillItem[];
  subtotal: number;
  gst: number;
  total: number;
  profit: number;
  date: string;
}

export default function BillHistory() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [search, setSearch] = useState("");
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Load bills from localStorage
  useEffect(() => {
    const storedBills = localStorage.getItem("bills");
    if (storedBills) {
      setBills(JSON.parse(storedBills));
    } else {
      // Sample bills data if none exist
      const sampleBills: Bill[] = [
        {
          billNumber: "INV-230417-001",
          customerName: "John Doe",
          customerPhone: "9898989898",
          items: [
            {
              id: 1,
              name: "Samsung Galaxy S21",
              category: "Electronics",
              purchasePrice: 58000,
              sellingPrice: 64999,
              quantity: 1,
            },
            {
              id: 3,
              name: "Logitech MX Master Mouse",
              category: "Electronics",
              purchasePrice: 7200,
              sellingPrice: 9999,
              quantity: 2,
            },
          ],
          subtotal: 84997,
          gst: 15299.46,
          total: 100296.46,
          profit: 9798,
          date: new Date().toISOString(),
        },
        {
          billNumber: "INV-230417-002",
          customerName: "Jane Smith",
          customerPhone: "9876543210",
          items: [
            {
              id: 2,
              name: "Nike Air Max",
              category: "Clothing",
              purchasePrice: 8500,
              sellingPrice: 11999,
              quantity: 1,
            },
          ],
          subtotal: 11999,
          gst: 2159.82,
          total: 14158.82,
          profit: 3499,
          date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        },
        {
          billNumber: "INV-230416-001",
          customerName: "Raj Kumar",
          customerPhone: "8765432109",
          items: [
            {
              id: 4,
              name: "Sony WH-1000XM4 Headphones",
              category: "Electronics",
              purchasePrice: 22000,
              sellingPrice: 27999,
              quantity: 1,
            },
            {
              id: 5,
              name: "Dettol Hand Sanitizer",
              category: "Health & Beauty",
              purchasePrice: 180,
              sellingPrice: 230,
              quantity: 3,
            },
          ],
          subtotal: 28689,
          gst: 5164.02,
          total: 33853.02,
          profit: 6069,
          date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
      ];
      
      setBills(sampleBills);
      localStorage.setItem("bills", JSON.stringify(sampleBills));
    }
  }, []);
  
  const filteredBills = bills.filter(bill => {
    const matchesSearch = search === "" || 
      bill.customerName.toLowerCase().includes(search.toLowerCase()) ||
      bill.billNumber.toLowerCase().includes(search.toLowerCase()) ||
      bill.customerPhone.includes(search);
    
    const matchesDate = !date || 
      new Date(bill.date).toDateString() === date.toDateString();
    
    return matchesSearch && matchesDate;
  });
  
  const clearFilters = () => {
    setSearch("");
    setDate(undefined);
  };
  
  const handleViewBill = (bill: Bill) => {
    setSelectedBill(bill);
  };
  
  const handleShareBill = (bill: Bill) => {
    setSelectedBill(bill);
    setShowShareModal(true);
  };
  
  const handlePrintBill = (bill: Bill) => {
    toast.info(`Printing bill ${bill.billNumber}...`);
  };
  
  const handleDownloadPDF = (bill: Bill) => {
    toast.info(`Downloading bill ${bill.billNumber} as PDF...`);
  };
  
  return (
    <div className="content-container">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold">Bill History</h1>
        <p className="text-muted-foreground">View and manage your previous bills</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by bill number, customer name or phone..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          {(search || date) && (
            <Button variant="ghost" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        {filteredBills.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium">No bills found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBills.map((bill) => (
                <Card key={bill.billNumber} className="card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{bill.billNumber}</CardTitle>
                      <div className="text-sm font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                        ₹{bill.total.toLocaleString()}
                      </div>
                    </div>
                    <CardDescription className="flex justify-between items-center">
                      <span>{bill.customerName}</span>
                      <span>{new Date(bill.date).toLocaleDateString()}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-4">
                      <p>{bill.items.length} items</p>
                      {bill.customerPhone && (
                        <p className="mt-1">Phone: {bill.customerPhone}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" onClick={() => handleViewBill(bill)}>
                        <FileText className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handlePrintBill(bill)}>
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDownloadPDF(bill)}>
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleShareBill(bill)}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredBills.length} of {bills.length} bills
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" disabled>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Bill View Dialog */}
      {selectedBill && (
        <Dialog open={!!selectedBill && !showShareModal} onOpenChange={(open) => !open && setSelectedBill(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Bill #{selectedBill.billNumber}
              </DialogTitle>
              <DialogDescription>
                {new Date(selectedBill.date).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Customer</p>
                  <p className="text-lg">{selectedBill.customerName}</p>
                  {selectedBill.customerPhone && (
                    <p className="text-sm text-muted-foreground">{selectedBill.customerPhone}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Total Amount</p>
                  <p className="text-lg font-bold">₹{selectedBill.total.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">
                    Inc. GST: ₹{selectedBill.gst.toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-2 text-left font-medium">Item</th>
                      <th className="px-4 py-2 text-center font-medium">Qty</th>
                      <th className="px-4 py-2 text-right font-medium">Price</th>
                      <th className="px-4 py-2 text-right font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBill.items.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2 text-center">{item.quantity}</td>
                        <td className="px-4 py-2 text-right">₹{item.sellingPrice}</td>
                        <td className="px-4 py-2 text-right">₹{item.sellingPrice * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t">
                      <td colSpan={2} className="px-4 py-2"></td>
                      <td className="px-4 py-2 text-right font-medium">Subtotal</td>
                      <td className="px-4 py-2 text-right">₹{selectedBill.subtotal.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="px-4 py-2"></td>
                      <td className="px-4 py-2 text-right font-medium">CGST (9%)</td>
                      <td className="px-4 py-2 text-right">₹{(selectedBill.gst / 2).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="px-4 py-2"></td>
                      <td className="px-4 py-2 text-right font-medium">SGST (9%)</td>
                      <td className="px-4 py-2 text-right">₹{(selectedBill.gst / 2).toLocaleString()}</td>
                    </tr>
                    <tr className="border-t">
                      <td colSpan={2} className="px-4 py-2"></td>
                      <td className="px-4 py-2 text-right font-bold">Total</td>
                      <td className="px-4 py-2 text-right font-bold">₹{selectedBill.total.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="gap-1" onClick={() => handlePrintBill(selectedBill)}>
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" className="gap-1" onClick={() => handleDownloadPDF(selectedBill)}>
                  <Download className="h-4 w-4" />
                  PDF
                </Button>
                <Button className="gap-1" onClick={() => {
                  setShowShareModal(true);
                }}>
                  <Send className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* WhatsApp Share Modal */}
      <WhatsAppShareModal
        open={showShareModal}
        onOpenChange={setShowShareModal}
        billId={selectedBill?.billNumber}
        mode="bill"
      />
    </div>
  );
}
