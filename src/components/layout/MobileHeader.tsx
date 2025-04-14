
import { Menu, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { VoiceAssistantModal } from "../features/VoiceAssistantModal";

interface MobileHeaderProps {
  toggleNav: () => void;
}

export function MobileHeader({ toggleNav }: MobileHeaderProps) {
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur md:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        <Button variant="ghost" size="icon" onClick={toggleNav} className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <h1 className="text-xl font-bold text-smartventory-purple">Smartventory</h1>
        <Button variant="ghost" size="icon" onClick={() => setVoiceModalOpen(true)}>
          <Volume2 className="h-6 w-6" />
          <span className="sr-only">Voice Assistant</span>
        </Button>
      </div>
      
      <VoiceAssistantModal open={voiceModalOpen} onOpenChange={setVoiceModalOpen} />
    </header>
  );
}
