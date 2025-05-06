
import { useState } from "react";
import { MessageCircle, Send, User, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Sample conversation data
const initialConversations = [
  {
    id: 1,
    platform: "Facebook",
    messages: [
      { id: 1, sender: "user", content: "Hello! I love your products. Do you ship internationally?", timestamp: "2 hours ago" },
      { id: 2, sender: "admin", content: "Hi there! Thank you for your interest. Yes, we do ship internationally to most countries. Could you let us know which country you're in?", timestamp: "1 hour ago" },
      { id: 3, sender: "user", content: "I'm in Canada. What are the shipping costs?", timestamp: "45 minutes ago" },
    ],
    user: { name: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=1" }
  },
  {
    id: 2,
    platform: "Instagram",
    messages: [
      { id: 1, sender: "user", content: "Is this product still available?", timestamp: "3 hours ago" },
      { id: 2, sender: "admin", content: "Yes, it's in stock! Would you like to place an order?", timestamp: "2 hours ago" },
    ],
    user: { name: "Michael Johnson", avatar: "https://i.pravatar.cc/150?img=3" }
  },
  {
    id: 3,
    platform: "Twitter",
    messages: [
      { id: 1, sender: "user", content: "I have some issues with my recent order #12345", timestamp: "1 day ago" },
      { id: 2, sender: "admin", content: "I'm sorry to hear that. Can you please provide more details about the issue?", timestamp: "20 hours ago" },
      { id: 3, sender: "user", content: "The package arrived damaged. Some items were broken.", timestamp: "18 hours ago" },
      { id: 4, sender: "admin", content: "I apologize for the inconvenience. We'll send a replacement right away. Could you send photos of the damaged items to our support email?", timestamp: "17 hours ago" },
    ],
    user: { name: "Alex Thompson", avatar: "https://i.pravatar.cc/150?img=5" }
  },
];

// Quick reply templates
const quickReplies = [
  "Thank you for your message! We'll get back to you shortly.",
  "Hi there! How can I help you today?",
  "We apologize for the inconvenience. Let me help resolve this issue.",
  "Great question! Let me find that information for you.",
  "Thanks for your interest in our product!"
];

export default function ConversationPanel() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversation, setActiveConversation] = useState(initialConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const updatedMessage = {
      id: activeConversation.messages.length + 1,
      sender: "admin",
      content: newMessage,
      timestamp: "Just now"
    };
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, updatedMessage]
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setActiveConversation({
      ...activeConversation,
      messages: [...activeConversation.messages, updatedMessage]
    });
    
    setNewMessage("");
    
    toast({
      title: "Message sent",
      description: `Your response to ${activeConversation.user.name} has been sent.`
    });
  };

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Customer Conversations</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {conversations.map((conv) => (
                  <div 
                    key={conv.id}
                    className={`flex items-start p-3 hover:bg-gray-50 cursor-pointer transition-colors ${conv.id === activeConversation.id ? 'bg-gray-50' : ''}`}
                    onClick={() => setActiveConversation(conv)}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                      {conv.user.avatar ? (
                        <img src={conv.user.avatar} alt={conv.user.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                          <User size={20} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm truncate">{conv.user.name}</h4>
                        <span className="text-xs text-gray-500">{conv.messages[conv.messages.length - 1].timestamp}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                          {conv.platform}
                        </span>
                        <p className="text-xs text-gray-500 truncate">
                          {conv.messages[conv.messages.length - 1].content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  {activeConversation?.user.avatar ? (
                    <img 
                      src={activeConversation.user.avatar} 
                      alt={activeConversation.user.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                      <User size={20} />
                    </div>
                  )}
                </div>
                <div>
                  <CardTitle className="text-base">{activeConversation?.user.name}</CardTitle>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Online now • {activeConversation?.platform}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeConversation?.messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'admin' 
                          ? 'bg-social-purple text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 block mt-1">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t">
                <Tabs defaultValue="reply">
                  <TabsList className="mb-2">
                    <TabsTrigger value="reply">Reply</TabsTrigger>
                    <TabsTrigger value="quick">Quick Replies</TabsTrigger>
                  </TabsList>
                  <TabsContent value="reply">
                    <div className="flex">
                      <Textarea 
                        placeholder="Type your message here..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 min-h-[80px]"
                      />
                      <Button 
                        className="ml-2 self-end" 
                        onClick={handleSendMessage}
                      >
                        <Send size={18} />
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="quick">
                    <div className="grid gap-2">
                      {quickReplies.map((reply, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start h-auto whitespace-normal text-left py-2"
                          onClick={() => handleQuickReply(reply)}
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
