
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, LayoutDashboard, MessageSquare, ChartBar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  color?: string;
  onClick?: () => void;
}

const SidebarLink = ({ icon, label, active = false, color = "text-social-purple", onClick }: SidebarLinkProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-colors",
        active ? "bg-social-purple-light text-social-purple font-medium" : "hover:bg-accent text-foreground/80"
      )}
    >
      <span className={cn("", color)}>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-40"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      )}
      
      <div
        className={cn(
          "fixed z-30 inset-y-0 left-0 bg-white shadow-md transition-all duration-300 overflow-hidden border-r",
          isOpen ? "w-64 opacity-100" : "w-0 opacity-0"
        )}
      >
        <div className="flex flex-col h-full py-6">
          <div className="px-6 mb-8">
            <h1 className="font-bold text-xl text-social-purple">MediaPulse</h1>
          </div>
          
          <div className="space-y-1 px-3">
            <p className="text-xs font-semibold text-muted-foreground px-3 mb-2">OVERVIEW</p>
            <SidebarLink
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              active={true}
            />
            <SidebarLink
              icon={<ChartBar size={20} />}
              label="Analytics"
            />
            <SidebarLink
              icon={<MessageSquare size={20} />}
              label="Conversations"
            />
          </div>
          
          <div className="mt-8 space-y-1 px-3">
            <p className="text-xs font-semibold text-muted-foreground px-3 mb-2">PLATFORMS</p>
            <SidebarLink
              icon={<Facebook size={20} />}
              label="Facebook"
              color="text-blue-600"
            />
            <SidebarLink
              icon={<Instagram size={20} />}
              label="Instagram"
              color="text-pink-600"
            />
            <SidebarLink
              icon={<Twitter size={20} />}
              label="Twitter"
              color="text-sky-500"
            />
            <SidebarLink
              icon={<Linkedin size={20} />}
              label="LinkedIn"
              color="text-blue-700"
            />
            <SidebarLink
              icon={<Youtube size={20} />}
              label="YouTube"
              color="text-red-600"
            />
          </div>
          
          <div className="mt-auto px-4">
            <div className="bg-social-purple-light rounded-lg p-4">
              <p className="text-sm font-medium text-social-purple">Need help?</p>
              <p className="text-xs text-gray-700 mt-1">Check our knowledge base for tips and tutorials</p>
              <Button size="sm" className="mt-3 w-full bg-social-purple hover:bg-social-purple-dark">
                View help center
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {isOpen && isMobile && (
        <div className="fixed inset-0 bg-black/20 z-20" onClick={toggleSidebar} />
      )}
    </>
  );
}
