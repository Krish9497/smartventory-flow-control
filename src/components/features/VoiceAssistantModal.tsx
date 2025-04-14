
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceAssistantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VoiceAssistantModal({ open, onOpenChange }: VoiceAssistantModalProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  // Simulate voice recognition
  useEffect(() => {
    if (isListening) {
      const timer = setTimeout(() => {
        setIsListening(false);
        
        // Simulate processing the voice command
        setResponse("Processing your request...");
        
        setTimeout(() => {
          // Demo responses based on keywords
          if (transcript.toLowerCase().includes("inventory")) {
            setResponse("You have 153 items in inventory. 12 items are low in stock.");
          } else if (transcript.toLowerCase().includes("sales")) {
            setResponse("Today's sales amount to ₹24,500. That's 15% higher than yesterday.");
          } else if (transcript.toLowerCase().includes("profit")) {
            setResponse("Your profit margin this month is 32%, which is 5% higher than last month.");
          } else {
            setResponse("I didn't understand that command. Try asking about inventory, sales, or profits.");
          }
        }, 1500);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isListening, transcript]);

  const toggleListening = () => {
    if (!isListening) {
      setTranscript("");
      setResponse("");
      setIsListening(true);
      
      // Simulate getting transcript while listening
      setTimeout(() => {
        setTranscript("Show me inventory status");
      }, 1000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-smartventory-purple" />
            Voice Assistant
          </DialogTitle>
          <DialogDescription>
            Ask questions or give commands using your voice
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors ${
            isListening 
              ? "bg-smartventory-purple animate-pulse-light" 
              : "bg-muted"
          }`}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-16 w-16 rounded-full" 
              onClick={toggleListening}
            >
              {isListening ? (
                <MicOff className="h-8 w-8 text-white" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
          </div>
          
          {transcript && (
            <div className="text-center mt-2 p-3 bg-muted rounded-lg w-full">
              <p className="text-sm font-medium">You said:</p>
              <p className="text-lg">{transcript}</p>
            </div>
          )}
          
          {response && (
            <div className="text-center mt-2 p-3 bg-smartventory-light-purple rounded-lg w-full">
              <p className="text-sm font-medium text-smartventory-dark-purple">Assistant:</p>
              <p className="text-lg">{response}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
