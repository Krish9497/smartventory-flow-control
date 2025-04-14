
import { useState } from "react";
import {
  MessageSquare,
  Bell,
  Send,
  ShoppingBag,
  AlertTriangle,
  BarChart3,
  Check,
  RefreshCw,
  Smartphone,
  Settings,
  Info,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { WhatsAppShareModal } from "@/components/features/WhatsAppShareModal";

export default function WhatsAppBot() {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [connectStatus, setConnectStatus] = useState<"connected" | "disconnected">("disconnected");
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const handleConnect = () => {
    if (!whatsappNumber || whatsappNumber.length < 10) {
      toast.error("Please enter a valid WhatsApp number");
      return;
    }
    
    // Simulate connection process
    toast.info("Connecting to WhatsApp...");
    
    setTimeout(() => {
      setConnectStatus("connected");
      toast.success("Successfully connected to WhatsApp!");
    }, 1500);
  };
  
  const handleDisconnect = () => {
    setConnectStatus("disconnected");
    toast.info("Disconnected from WhatsApp");
  };
  
  const handleSaveSettings = () => {
    toast.success("WhatsApp alert settings saved successfully");
  };
  
  return (
    <div className="content-container">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold">WhatsApp Bot</h1>
        <p className="text-muted-foreground">Configure automated WhatsApp alerts and bill sharing</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Connect WhatsApp
              </CardTitle>
              <CardDescription>
                Connect your business WhatsApp number to enable alerts and invoice sharing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-number">WhatsApp Business Number</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md">
                      +91
                    </span>
                    <Input
                      id="whatsapp-number"
                      type="tel"
                      placeholder="Enter your 10-digit WhatsApp number"
                      className="rounded-l-none"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      maxLength={10}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm mt-2">
                  <span 
                    className={`inline-flex h-2 w-2 rounded-full ${
                      connectStatus === "connected" ? "bg-smartventory-green animate-pulse" : "bg-muted"
                    }`} 
                  />
                  <span className={connectStatus === "connected" ? "text-smartventory-green" : "text-muted-foreground"}>
                    {connectStatus === "connected" ? "Connected" : "Not connected"}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {connectStatus === "connected" ? (
                <Button variant="outline" onClick={handleDisconnect}>Disconnect</Button>
              ) : (
                <Button onClick={handleConnect}>Connect WhatsApp</Button>
              )}
            </CardFooter>
          </Card>
          
          <Tabs defaultValue="alerts" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="alerts">
                <Bell className="h-4 w-4 mr-2" />
                Alert Settings
              </TabsTrigger>
              <TabsTrigger value="invoices">
                <Send className="h-4 w-4 mr-2" />
                Invoice Sharing
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="alerts">
              <Card>
                <CardHeader>
                  <CardTitle>WhatsApp Alert Configuration</CardTitle>
                  <CardDescription>
                    Configure what automated alerts you want to receive on WhatsApp
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex flex-col space-y-1">
                      <Label htmlFor="low-stock" className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-smartventory-yellow" />
                        Low Stock Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when items fall below minimum stock level
                      </p>
                    </div>
                    <Switch
                      id="low-stock"
                      checked={lowStockAlerts}
                      onCheckedChange={setLowStockAlerts}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex flex-col space-y-1">
                      <Label htmlFor="daily-summary" className="flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4 text-smartventory-purple" />
                        Daily Sales Summary
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive daily sales report at the end of each day
                      </p>
                    </div>
                    <Switch
                      id="daily-summary"
                      checked={dailySummary}
                      onCheckedChange={setDailySummary}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex flex-col space-y-1">
                      <Label htmlFor="weekly-summary" className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-smartventory-blue" />
                        Weekly Inventory Report
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get a detailed weekly report of inventory status
                      </p>
                    </div>
                    <Switch
                      id="weekly-summary"
                      checked={weeklySummary}
                      onCheckedChange={setWeeklySummary}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleSaveSettings} 
                    className="w-full"
                    disabled={connectStatus !== "connected"}
                  >
                    Save Alert Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="invoices">
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Sharing Settings</CardTitle>
                  <CardDescription>
                    Configure how invoices are shared with customers via WhatsApp
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex flex-col space-y-1">
                        <Label className="flex items-center gap-2">
                          <Settings className="h-4 w-4 text-smartventory-purple" />
                          Default Message Template
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Customize the message sent with invoices
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm mb-2">Preview:</p>
                      <div className="bg-muted p-3 rounded-lg text-sm">
                        <p>Hello [Customer Name],</p>
                        <p className="mt-2">Thank you for your purchase! Here is your invoice from [Store Name].</p>
                        <p className="mt-2">Invoice #: [Invoice Number]</p>
                        <p>Amount: ₹[Amount]</p>
                        <p className="mt-2">Please find the attached PDF invoice.</p>
                        <p className="mt-2">Regards,</p>
                        <p>[Store Name] Team</p>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => setShowShareModal(true)} 
                      className="w-full"
                      disabled={connectStatus !== "connected"}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Test WhatsApp Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                WhatsApp Integration Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="border rounded-lg p-3 text-center">
                  <div className={`inline-block p-2 rounded-full ${connectStatus === "connected" ? "bg-smartventory-green/10" : "bg-muted"} mb-2`}>
                    {connectStatus === "connected" ? (
                      <Check className="h-5 w-5 text-smartventory-green" />
                    ) : (
                      <RefreshCw className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="text-sm font-medium">Connection</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {connectStatus === "connected" ? "Active" : "Inactive"}
                  </p>
                </div>
                
                <div className="border rounded-lg p-3 text-center">
                  <div className="inline-block p-2 rounded-full bg-smartventory-yellow/10 mb-2">
                    <Bell className="h-5 w-5 text-smartventory-yellow" />
                  </div>
                  <h3 className="text-sm font-medium">Alerts</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {(lowStockAlerts || dailySummary || weeklySummary) ? "Configured" : "Not set"}
                  </p>
                </div>
                
                <div className="border rounded-lg p-3 text-center">
                  <div className="inline-block p-2 rounded-full bg-smartventory-purple/10 mb-2">
                    <MessageSquare className="h-5 w-5 text-smartventory-purple" />
                  </div>
                  <h3 className="text-sm font-medium">Messages</h3>
                  <p className="text-xs text-muted-foreground mt-1">Ready</p>
                </div>
                
                <div className="border rounded-lg p-3 text-center">
                  <div className="inline-block p-2 rounded-full bg-smartventory-blue/10 mb-2">
                    <Send className="h-5 w-5 text-smartventory-blue" />
                  </div>
                  <h3 className="text-sm font-medium">Sharing</h3>
                  <p className="text-xs text-muted-foreground mt-1">Enabled</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
                <div className="space-y-2 text-sm">
                  {connectStatus === "connected" ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Low stock alert sent</span>
                        <span className="text-xs">Today, 2:30 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Invoice #INV-230417-001 shared</span>
                        <span className="text-xs">Today, 11:15 AM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Daily summary sent</span>
                        <span className="text-xs">Yesterday, 9:00 PM</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-center py-2 text-muted-foreground">
                      Connect WhatsApp to see activity
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
              <CardDescription>Why use WhatsApp integration</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-smartventory-green mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Instant invoice sharing with customers</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-smartventory-green mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Real-time low stock alerts to prevent stockouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-smartventory-green mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Automated business insights delivered to your phone</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-smartventory-green mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Improved customer experience with digital receipts</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* WhatsApp Share Modal */}
      <WhatsAppShareModal
        open={showShareModal}
        onOpenChange={setShowShareModal}
        mode="alerts"
      />
    </div>
  );
}
