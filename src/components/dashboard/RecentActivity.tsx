
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample activity data
const activities = [
  {
    id: 1,
    platform: "instagram",
    action: "comment",
    user: {
      name: "Emma Wilson",
      avatar: "",
      initial: "EW",
    },
    content: "Great post! Love the photography in this one.",
    time: "10 min ago",
  },
  {
    id: 2,
    platform: "facebook",
    action: "like",
    user: {
      name: "John Rivera",
      avatar: "",
      initial: "JR",
    },
    content: "Liked your latest product announcement.",
    time: "32 min ago",
  },
  {
    id: 3,
    platform: "twitter",
    action: "retweet",
    user: {
      name: "Sarah Chen",
      avatar: "",
      initial: "SC",
    },
    content: "Retweeted your post about upcoming events.",
    time: "1 hour ago",
  },
  {
    id: 4,
    platform: "linkedin",
    action: "comment",
    user: {
      name: "Michael Brown",
      avatar: "",
      initial: "MB",
    },
    content: "Interesting insights on industry trends.",
    time: "3 hours ago",
  },
];

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "facebook":
      return <Facebook className="h-4 w-4 text-blue-600" />;
    case "instagram":
      return <Instagram className="h-4 w-4 text-pink-600" />;
    case "twitter":
      return <Twitter className="h-4 w-4 text-sky-500" />;
    case "linkedin":
      return <Linkedin className="h-4 w-4 text-blue-700" />;
    default:
      return null;
  }
};

const ActivityItem = ({ activity }: { activity: typeof activities[0] }) => {
  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-0">
      <Avatar className="h-8 w-8">
        <AvatarImage src={activity.user.avatar} />
        <AvatarFallback>{activity.user.initial}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground line-clamp-2">
          <span className="font-semibold">{activity.user.name}</span>{" "}
          {activity.content}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="flex items-center gap-1">
            {getPlatformIcon(activity.platform)}
            <span className="text-xs text-muted-foreground capitalize">
              {activity.platform}
            </span>
          </span>
          <span className="text-xs text-muted-foreground">{activity.time}</span>
        </div>
      </div>
    </div>
  );
};

export default function RecentActivity() {
  return (
    <Card className="social-card h-full">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[350px] -mt-2">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </CardContent>
    </Card>
  );
}
