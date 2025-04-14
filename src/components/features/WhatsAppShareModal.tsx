
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare, Bell, Send } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface WhatsAppShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billId?: string;
  mode: "bill" | "alerts";
}

export function WhatsAppShareModal({ 
  open, 
  onOpenChange, 
  billId,
  mode 
}: WhatsAppShareModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(true);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === "bill" ? (
              <>
                <Send className="h-5 w-5 text-smartventory-purple" />
                Share Bill via WhatsApp
              </>
            ) : (
              <>
                <Bell className="h-5 w-5 text-smartventory-purple" />
                WhatsApp Alerts
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {mode === "bill" 
              ? "Send invoice directly to your customer's WhatsApp" 
              : "Configure automatic WhatsApp notifications"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="phone">WhatsApp Number</Label>
            <div className="flex mt-1.5">
              <span className="inline-flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md">
                +91
              </span>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 px-3 py-2 border border-input rounded-r-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="WhatsApp number"
                maxLength={10}
              />
            </div>
          </div>
          
          {mode === "alerts" && (
            <div className="space-y-3 border rounded-lg p-3">
              <h3 className="font-medium">Alert Preferences</h3>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="low-stock" className="cursor-pointer">Low Stock Alerts</Label>
                <Switch 
                  id="low-stock" 
                  checked={lowStockAlerts}
                  onCheckedChange={setLowStockAlerts}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="daily-summary" className="cursor-pointer">Daily Sales Summary</Label>
                <Switch 
                  id="daily-summary" 
                  checked={dailySummary}
                  onCheckedChange={setDailySummary}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="weekly-summary" className="cursor-pointer">Weekly Inventory Report</Label>
                <Switch 
                  id="weekly-summary" 
                  checked={weeklySummary}
                  onCheckedChange={setWeeklySummary}
                />
              </div>
            </div>
          )}
          
          {mode === "bill" && billId && (
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-sm">Sending Bill #{billId}</p>
              <p className="text-xs text-muted-foreground mt-1">PDF will be generated automatically</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button 
            className="gap-2" 
            disabled={!phoneNumber || phoneNumber.length < 10}
          >
            <MessageSquare className="h-4 w-4" />
            {mode === "bill" ? "Send Invoice" : "Save Settings"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
