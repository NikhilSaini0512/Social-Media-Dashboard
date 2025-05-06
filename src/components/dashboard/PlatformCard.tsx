
import { ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

interface PlatformData {
  name: string;
  icon: React.ReactNode;
  color: string;
  followers: string;
  change: number;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

interface PlatformCardProps {
  data: PlatformData;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border shadow-sm rounded-md">
        <p className="text-xs font-medium">{data.name}</p>
        <p className="text-xs">{`${data.value}%`}</p>
      </div>
    );
  }
  return null;
};

export default function PlatformCard({ data }: PlatformCardProps) {
  // Generate engagement chart data
  const engagementData = [
    { name: "Likes", value: data.engagement.likes, color: data.color },
    { name: "Comments", value: data.engagement.comments, color: "#7E69AB" },
    { name: "Shares", value: data.engagement.shares, color: "#E5DEFF" },
  ];

  const isPositive = data.change >= 0;

  return (
    <Card className="social-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          {data.icon}
          <CardTitle className="text-sm font-medium">{data.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="stat-label">Followers</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="stat-value">{data.followers}</p>
              <div className={`text-xs font-medium flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {Math.abs(data.change)}%
              </div>
            </div>
          </div>
          <div className="h-[80px]">
            <p className="stat-label mb-1">Engagement</p>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={engagementData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={22}
                  outerRadius={36}
                  paddingAngle={2}
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
