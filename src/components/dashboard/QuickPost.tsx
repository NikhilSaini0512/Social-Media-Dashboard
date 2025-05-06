
import { useState } from "react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Image, Calendar, Smile, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface PlatformButtonProps {
  platform: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const PlatformButton = ({ platform, icon, selected, onClick }: PlatformButtonProps) => {
  const getColorClasses = () => {
    if (selected) {
      switch (platform) {
        case "Facebook":
          return "bg-blue-100 text-blue-600 border-blue-300";
        case "Instagram":
          return "bg-pink-100 text-pink-600 border-pink-300";
        case "Twitter":
          return "bg-sky-100 text-sky-500 border-sky-300";
        case "LinkedIn":
          return "bg-blue-100 text-blue-700 border-blue-300";
        case "YouTube":
          return "bg-red-100 text-red-600 border-red-300";
        default:
          return "bg-gray-100 text-gray-600 border-gray-300";
      }
    }
    return "bg-white hover:bg-gray-50";
  };

  return (
    <button
      className={`border rounded-full p-2 transition-colors ${getColorClasses()} ${selected ? "ring-2 ring-offset-1" : ""}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default function QuickPost() {
  const [message, setMessage] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const { toast } = useToast();

  const platforms = [
    { name: "Facebook", icon: <Facebook className="h-5 w-5" /> },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" /> },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" /> },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" /> },
    { name: "YouTube", icon: <Youtube className="h-5 w-5" /> },
  ];

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleSubmit = () => {
    if (!message.trim()) {
      toast({
        title: "Empty message",
        description: "Please write something before posting.",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platform selected",
        description: "Please select at least one platform.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Post scheduled",
      description: `Your message will be posted to ${selectedPlatforms.join(", ")}.`,
    });
    
    // Reset form
    setMessage("");
    setSelectedPlatforms([]);
  };

  return (
    <Card className="social-card h-full">
      <CardHeader>
        <CardTitle className="text-lg">Create Post</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="What would you like to share?"
          className="min-h-[120px] resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Select platforms:</p>
          <div className="flex gap-2 flex-wrap">
            {platforms.map((platform) => (
              <PlatformButton
                key={platform.name}
                platform={platform.name}
                icon={platform.icon}
                selected={selectedPlatforms.includes(platform.name)}
                onClick={() => togglePlatform(platform.name)}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex gap-2">
          <Button size="icon" variant="outline">
            <Image className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline">
            <Smile className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={handleSubmit} className="bg-social-purple hover:bg-social-purple-dark">
          <Send className="h-4 w-4 mr-2" /> Post
        </Button>
      </CardFooter>
    </Card>
  );
}
