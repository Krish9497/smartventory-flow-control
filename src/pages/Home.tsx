
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PackageOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-smartventory-light-purple">
      <div className="w-full max-w-md text-center space-y-6 animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="h-24 w-24 rounded-full bg-smartventory-purple flex items-center justify-center">
            <PackageOpen className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Smart<span className="text-smartventory-purple">ventory</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Intelligent inventory management for modern businesses
        </p>
        
        <div className="pt-4 space-y-4">
          <Button asChild className="w-full py-6 text-lg">
            <Link to="/login">Login</Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-smartventory-purple hover:underline">
              Register now
            </Link>
          </p>
        </div>
        
        <div className="pt-8 text-center">
          <div className="inline-flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <span>Powered by</span>
            <span className="font-semibold text-foreground">AI Predictions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
