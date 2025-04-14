
import { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Monitor,
  Palette,
  Save,
  RefreshCw,
  UserCircle,
  Store,
  CreditCard,
  Percent,
  Smartphone,
  Shield,
  HelpCircle,
  LogOut,
  Check,
  Info,
  AlertTriangle
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function Settings() {
  const [theme, setTheme] = useState<"light" | "dark" | "classic" | "modern">(
    () => (localStorage.getItem("theme") as any) || "light"
  );
  const [storeSettings, setStoreSettings] = useState({
    storeName: "My Business",
    ownerName: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    address: "123 Main Street, City, State, 123456",
    gstNumber: "22AAAAA0000A1Z5",
  });
  const [taxSettings, setTaxSettings] = useState({
    gstPercentage: 18,
    includeTax: true,
    cgstSgstSplit: true,
    showTaxDetails: true,
  });
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupToGoogleDrive: false,
    backupFrequency: "daily",
    lastBackup: "Never",
  });
  
  // Update theme in localStorage and apply it
  useEffect(() => {
    // Update theme in localStorage
    localStorage.setItem("theme", theme);
    
    // Apply dark class based on theme
    if (theme === "dark" || theme === "modern") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  
  const handleStoreSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoreSettings((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSaveStoreSettings = () => {
    // Save store settings to localStorage
    localStorage.setItem("storeSettings", JSON.stringify(storeSettings));
    toast.success("Store settings saved successfully!");
  };
  
  const handleTaxSettingsChange = (name: string, value: any) => {
    setTaxSettings((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSaveTaxSettings = () => {
    // Save tax settings to localStorage
    localStorage.setItem("taxSettings", JSON.stringify(taxSettings));
    toast.success("Tax settings saved successfully!");
  };
  
  const handleBackupSettingsChange = (name: string, value: any) => {
    setBackupSettings((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSaveBackupSettings = () => {
    // Save backup settings to localStorage
    localStorage.setItem("backupSettings", JSON.stringify(backupSettings));
    toast.success("Backup settings saved successfully!");
  };
  
  const handleManualBackup = () => {
    toast.info("Creating backup...");
    
    setTimeout(() => {
      const date = new Date();
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      
      setBackupSettings((prev) => ({ ...prev, lastBackup: formattedDate }));
      localStorage.setItem("backupSettings", JSON.stringify({
        ...backupSettings,
        lastBackup: formattedDate,
      }));
      
      toast.success("Backup completed successfully!");
    }, 2000);
  };
  
  const handleResetApp = () => {
    if (confirm("Are you sure you want to reset the app? All data will be lost.")) {
      localStorage.clear();
      toast.success("App has been reset. Refreshing page...");
      
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
  };
  
  return (
    <div className="content-container">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your application preferences</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger value="general" className="text-xs sm:text-sm py-2">
            <SettingsIcon className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="store" className="text-xs sm:text-sm py-2">
            <Store className="h-4 w-4 mr-2" />
            Store
          </TabsTrigger>
          <TabsTrigger value="tax" className="text-xs sm:text-sm py-2">
            <Percent className="h-4 w-4 mr-2" />
            Tax
          </TabsTrigger>
          <TabsTrigger value="backup" className="text-xs sm:text-sm py-2">
            <Save className="h-4 w-4 mr-2" />
            Backup
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="general">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of your application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition-all ${
                        theme === "light" ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setTheme("light")}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <Sun className="h-6 w-6 text-yellow-500" />
                        {theme === "light" && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <h3 className="font-medium">Light</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Clean, bright interface
                      </p>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition-all ${
                        theme === "dark" ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setTheme("dark")}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <Moon className="h-6 w-6 text-smartventory-purple" />
                        {theme === "dark" && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <h3 className="font-medium">Dark</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Easy on the eyes
                      </p>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition-all ${
                        theme === "classic" ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setTheme("classic")}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <Monitor className="h-6 w-6 text-blue-500" />
                        {theme === "classic" && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <h3 className="font-medium">Classic</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Traditional design
                      </p>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition-all ${
                        theme === "modern" ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setTheme("modern")}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <Palette className="h-6 w-6 text-green-500" />
                        {theme === "modern" && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <h3 className="font-medium">Modern</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Contemporary look
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Manage your account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <UserCircle className="h-16 w-16 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <p className="text-sm text-muted-foreground">john@example.com</p>
                    <p className="text-xs text-muted-foreground mt-1">Free Plan</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">Edit Profile</Button>
                  <Button variant="outline" className="w-full" disabled>
                    Upgrade to Pro
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Manage your security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="password">Password</Label>
                    <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
                
                <Separator />
                
                <Button variant="destructive" className="w-full" onClick={handleResetApp}>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Reset Application
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Store Settings Tab */}
        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Enter your business details that will appear on invoices and reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Business Name</Label>
                  <Input
                    id="store-name"
                    name="storeName"
                    value={storeSettings.storeName}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="owner-name">Owner Name</Label>
                  <Input
                    id="owner-name"
                    name="ownerName"
                    value={storeSettings.ownerName}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={storeSettings.email}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={storeSettings.phone}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={storeSettings.address}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gst-number">GST Number</Label>
                  <Input
                    id="gst-number"
                    name="gstNumber"
                    value={storeSettings.gstNumber}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="inr">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="usd">US Dollar ($)</SelectItem>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                      <SelectItem value="gbp">British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveStoreSettings}>Save Store Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Tax Settings Tab */}
        <TabsContent value="tax">
          <Card>
            <CardHeader>
              <CardTitle>Tax Configuration</CardTitle>
              <CardDescription>
                Configure tax settings for your invoices and billing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gst-percentage">GST Percentage</Label>
                  <Select 
                    value={String(taxSettings.gstPercentage)}
                    onValueChange={(value) => handleTaxSettingsChange("gstPercentage", parseInt(value))}
                  >
                    <SelectTrigger id="gst-percentage">
                      <SelectValue placeholder="Select GST percentage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="12">12%</SelectItem>
                      <SelectItem value="18">18%</SelectItem>
                      <SelectItem value="28">28%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="include-tax">Include Tax in Price</Label>
                    <p className="text-sm text-muted-foreground">
                      Display prices inclusive of tax
                    </p>
                  </div>
                  <Switch 
                    id="include-tax" 
                    checked={taxSettings.includeTax}
                    onCheckedChange={(checked) => handleTaxSettingsChange("includeTax", checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="cgst-sgst">Split GST into CGST & SGST</Label>
                    <p className="text-sm text-muted-foreground">
                      Show CGST and SGST separately on invoices (for intra-state)
                    </p>
                  </div>
                  <Switch 
                    id="cgst-sgst" 
                    checked={taxSettings.cgstSgstSplit}
                    onCheckedChange={(checked) => handleTaxSettingsChange("cgstSgstSplit", checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-tax-details">Show Tax Details</Label>
                    <p className="text-sm text-muted-foreground">
                      Display tax calculations on invoices
                    </p>
                  </div>
                  <Switch 
                    id="show-tax-details" 
                    checked={taxSettings.showTaxDetails}
                    onCheckedChange={(checked) => handleTaxSettingsChange("showTaxDetails", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveTaxSettings}>Save Tax Settings</Button>
            </CardFooter>
          </Card>
          
          <div className="mt-4 p-4 bg-muted rounded-lg flex items-center gap-2 text-sm">
            <Info className="h-5 w-5 text-smartventory-blue" />
            <span>
              Tax settings are applied to all new bills. These settings do not affect historical data.
            </span>
          </div>
        </TabsContent>
        
        {/* Backup Settings Tab */}
        <TabsContent value="backup">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Backup Configuration</CardTitle>
                <CardDescription>
                  Configure how your data is backed up and secured
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-backup">Automatic Backup</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically backup your data to prevent data loss
                    </p>
                  </div>
                  <Switch 
                    id="auto-backup" 
                    checked={backupSettings.autoBackup}
                    onCheckedChange={(checked) => handleBackupSettingsChange("autoBackup", checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="google-drive">Backup to Google Drive</Label>
                    <p className="text-sm text-muted-foreground">
                      Store backups in your Google Drive account
                    </p>
                  </div>
                  <Switch 
                    id="google-drive" 
                    checked={backupSettings.backupToGoogleDrive}
                    onCheckedChange={(checked) => handleBackupSettingsChange("backupToGoogleDrive", checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select 
                    value={backupSettings.backupFrequency}
                    onValueChange={(value) => handleBackupSettingsChange("backupFrequency", value)}
                    disabled={!backupSettings.autoBackup}
                  >
                    <SelectTrigger id="backup-frequency">
                      <SelectValue placeholder="Select backup frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium">Last Backup</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {backupSettings.lastBackup}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleManualBackup}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Backup Now
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveBackupSettings}>Save Backup Settings</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Export or import your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Export All Data
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Import Data
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
                <CardDescription>
                  Get help with your application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Need Help?</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    If you're experiencing issues or have questions, our support team is here to help.
                  </p>
                  <Button variant="outline" className="w-full mt-2">Contact Support</Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Privacy & Terms</span>
                  </div>
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <span>•</span>
                    <a href="#" className="hover:underline">Terms of Service</a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
