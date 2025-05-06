
import { ArrowUp, ArrowDown, Activity, Users, Share, TrendingUp, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, AreaChart, Area, BarChart, Bar } from "recharts";
import { 
  Tooltip as UITooltip, 
  TooltipProvider, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";

// Sample data for charts - now with more months for year-to-date view
const engagementData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 7000 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 8000 },
  { name: "Jul", value: 9500 },
  { name: "Aug", value: 9800 },
  { name: "Sep", value: 11000 },
  { name: "Oct", value: 10500 },
  { name: "Nov", value: 12000 },
  { name: "Dec", value: 13500 },
];

const followersData = [
  { name: "Jan", value: 10000 },
  { name: "Feb", value: 12000 },
  { name: "Mar", value: 14000 },
  { name: "Apr", value: 15000 },
  { name: "May", value: 17800 },
  { name: "Jun", value: 20000 },
  { name: "Jul", value: 21500 },
  { name: "Aug", value: 24000 },
  { name: "Sep", value: 26500 },
  { name: "Oct", value: 28000 },
  { name: "Nov", value: 30000 },
  { name: "Dec", value: 32500 },
];

const postsData = [
  { name: "Mon", value: 5 },
  { name: "Tue", value: 3 },
  { name: "Wed", value: 7 },
  { name: "Thu", value: 2 },
  { name: "Fri", value: 4 },
  { name: "Sat", value: 8 },
  { name: "Sun", value: 6 },
];

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  chartData?: Array<{name: string, value: number}>;
  chartType?: 'line' | 'area' | 'bar';
}

// Properly typed CustomTooltip component
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<any>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border shadow-sm rounded-md">
        <p className="text-xs">{`${label} : ${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};

const timeRangeOptions = ['7D', '30D', 'YTD', '1Y'];

const StatCard = ({ title, value, change, icon, chartData, chartType = 'line' }: StatCardProps) => {
  const [timeRange, setTimeRange] = useState('30D');
  const isPositive = change >= 0;
  
  // Filter data based on time range
  const getFilteredData = () => {
    if (!chartData) return [];
    
    const currentData = [...chartData];
    
    switch(timeRange) {
      case '7D':
        return currentData.slice(-7);
      case '30D':
        return currentData.slice(-30);
      case 'YTD':
        return currentData;
      case '1Y':
        return currentData;
      default:
        return currentData;
    }
  };

  const filteredData = getFilteredData();
  
  return (
    <Card className="social-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="bg-muted/40 p-2 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold">{value}</div>
          <div className={`text-xs font-medium flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {Math.abs(change)}%
          </div>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help ml-1">
                  <Info className="h-3 w-3 text-gray-400" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Compared to previous period</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
        
        {chartData && (
          <>
            <div className="flex justify-end mt-1 space-x-1 mb-2">
              {timeRangeOptions.map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "secondary" : "ghost"}
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </Button>
              ))}
            </div>
            <div className="mt-2 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' && (
                  <LineChart data={filteredData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#9b87f5" 
                      strokeWidth={2}
                      dot={false} 
                    />
                    <Tooltip content={(props) => <CustomTooltip {...props} />} />
                  </LineChart>
                )}
                
                {chartType === 'area' && (
                  <AreaChart data={filteredData}>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#9b87f5" 
                      fill="#e5deff" 
                      fillOpacity={0.7} 
                    />
                    <Tooltip content={(props) => <CustomTooltip {...props} />} />
                  </AreaChart>
                )}
                
                {chartType === 'bar' && (
                  <BarChart data={filteredData}>
                    <Bar 
                      dataKey="value" 
                      fill="#9b87f5" 
                      radius={[4, 4, 0, 0]}
                      fillOpacity={0.7}
                    />
                    <Tooltip content={(props) => <CustomTooltip {...props} />} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

// New component for displaying detailed analytics insights
const AnalyticsInsights = () => {
  const config = {
    engagement: {
      label: "Engagement",
      theme: { light: "#9b87f5", dark: "#7E69AB" }
    },
    followers: {
      label: "Followers",
      theme: { light: "#1EAEDB", dark: "#33C3F0" }
    },
    posts: {
      label: "Posts",
      theme: { light: "#8B5CF6", dark: "#6D28D9" }
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold">Performance Insights</h3>
      <div className="bg-white p-4 rounded-lg border">
        <Tabs defaultValue="engagement">
          <TabsList className="mb-4">
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="posts">Content</TabsTrigger>
          </TabsList>
          <TabsContent value="engagement" className="space-y-4">
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Engagement Trend (Last 12 months)</h4>
              <div className="h-[240px]">
                <ChartContainer config={config}>
                  <LineChart data={engagementData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="var(--color-engagement)" 
                      name="engagement" 
                      strokeWidth={2}
                    />
                    <ChartTooltip>
                      <ChartTooltipContent />
                    </ChartTooltip>
                  </LineChart>
                </ChartContainer>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Your engagement has increased by 32.5% over the past year, with the highest growth in the last quarter.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="followers" className="space-y-4">
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Followers Growth (Last 12 months)</h4>
              <div className="h-[240px]">
                <ChartContainer config={config}>
                  <AreaChart data={followersData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="var(--color-followers)" 
                      fill="var(--color-followers)" 
                      fillOpacity={0.2}
                      name="followers" 
                    />
                    <ChartTooltip>
                      <ChartTooltipContent />
                    </ChartTooltip>
                  </AreaChart>
                </ChartContainer>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Your follower base has grown by 225% this year. The most significant increase happened after your viral post in September.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="posts" className="space-y-4">
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Weekly Post Performance</h4>
              <div className="h-[240px]">
                <ChartContainer config={config}>
                  <BarChart data={postsData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar 
                      dataKey="value" 
                      fill="var(--color-posts)" 
                      name="posts" 
                      radius={[4, 4, 0, 0]}
                    />
                    <ChartTooltip>
                      <ChartTooltipContent />
                    </ChartTooltip>
                  </BarChart>
                </ChartContainer>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Weekend posts generate 42% more engagement than weekday posts. Consider focusing your content strategy on Saturday and Sunday.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default function AnalyticsOverview() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <Button variant="outline" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <span>Export Report</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Engagement"
          value="34.5K"
          change={12.5}
          icon={<Activity className="h-4 w-4 text-social-purple" />}
          chartData={engagementData}
          chartType="line"
        />
        <StatCard
          title="Followers"
          value="21.5K"
          change={7.2}
          icon={<Users className="h-4 w-4 text-social-purple" />}
          chartData={followersData}
          chartType="area"
        />
        <StatCard
          title="Posts This Week"
          value="35"
          change={-2.5}
          icon={<Share className="h-4 w-4 text-social-purple" />}
          chartData={postsData}
          chartType="bar"
        />
      </div>
      
      <AnalyticsInsights />
    </div>
  );
}
