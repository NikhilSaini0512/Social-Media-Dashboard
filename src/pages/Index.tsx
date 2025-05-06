
import { useState } from "react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import AnalyticsOverview from "@/components/dashboard/AnalyticsOverview";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickPost from "@/components/dashboard/QuickPost";
import PlatformCard from "@/components/dashboard/PlatformCard";
import ConversationPanel from "@/components/dashboard/ConversationPanel";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample platform data
const platformsData = [
  {
    name: "Facebook",
    icon: <Facebook className="h-5 w-5 text-blue-600" />,
    color: "#1877F2",
    followers: "8.5K",
    change: 3.2,
    engagement: { likes: 40, comments: 35, shares: 25 }
  },
  {
    name: "Instagram",
    icon: <Instagram className="h-5 w-5 text-pink-600" />,
    color: "#E1306C",
    followers: "12.8K", 
    change: 5.7,
    engagement: { likes: 55, comments: 25, shares: 20 }
  },
  {
    name: "Twitter",
    icon: <Twitter className="h-5 w-5 text-sky-500" />,
    color: "#1DA1F2",
    followers: "6.2K",
    change: -1.8,
    engagement: { likes: 35, comments: 40, shares: 25 }
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="h-5 w-5 text-blue-700" />,
    color: "#0A66C2",
    followers: "4.1K",
    change: 2.5,
    engagement: { likes: 30, comments: 45, shares: 25 }
  },
  {
    name: "YouTube",
    icon: <Youtube className="h-5 w-5 text-red-600" />,
    color: "#FF0000",
    followers: "3.2K",
    change: 8.3,
    engagement: { likes: 60, comments: 20, shares: 20 }
  },
];

const Index = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-screen ml-0 md:ml-64">
        <Header />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="mb-6"
            >
              <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex">
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="conversations">Conversations</TabsTrigger>
              </TabsList>

              <TabsContent value="analytics" className="space-y-6">
                <AnalyticsOverview />
                
                <h2 className="text-2xl font-bold mt-8">Platform Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {platformsData.map((platform) => (
                    <PlatformCard key={platform.name} data={platform} />
                  ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                  <QuickPost />
                  <RecentActivity />
                </div>
              </TabsContent>

              <TabsContent value="conversations">
                <ConversationPanel />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
