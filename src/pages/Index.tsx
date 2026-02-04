import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, CalendarCheck, Megaphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    title: "Total Employees",
    value: "248",
    icon: Users,
    change: "+12%",
    changeType: "positive" as const,
  },
  {
    title: "Present Today",
    value: "186",
    icon: Clock,
    change: "75%",
    changeType: "neutral" as const,
  },
  {
    title: "Pending Leaves",
    value: "14",
    icon: CalendarCheck,
    change: "-3",
    changeType: "negative" as const,
  },
  {
    title: "Announcements",
    value: "5",
    icon: Megaphone,
    change: "This week",
    changeType: "neutral" as const,
  },
];

const recentActivities = [
  { user: "John Doe", action: "submitted leave request", time: "2 hours ago" },
  { user: "Jane Smith", action: "clocked in", time: "3 hours ago" },
  { user: "Mike Johnson", action: "updated profile", time: "5 hours ago" },
  { user: "Sarah Wilson", action: "approved offset request", time: "Yesterday" },
];

const upcomingEvents = [
  { title: "Team Meeting", date: "Feb 5, 2026", time: "10:00 AM" },
  { title: "Monthly Review", date: "Feb 7, 2026", time: "2:00 PM" },
  { title: "Company Town Hall", date: "Feb 10, 2026", time: "3:00 PM" },
];

const Index = () => {
  const navigate = useNavigate();

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "Apply Leave":
        navigate("/leave");
        break;
      // Add other quick actions here as needed
      default:
        break;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground text-lg">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.title}</p>
                    <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                      <stat.icon className="w-5 h-5 text-primary" size={20} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p
                      className={`text-sm font-medium ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : stat.changeType === "negative"
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="bg-card border-border hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-6">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 pb-6 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {activity.user.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm text-foreground leading-relaxed">
                        <span className="font-semibold">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="bg-card border-border hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 pb-6 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex flex-col items-center justify-center">
                      <span className="text-xs text-primary font-semibold uppercase">
                        {event.date.split(" ")[0]}
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {event.date.split(" ")[1].replace(",", "")}
                      </span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-semibold text-foreground">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-card border-border hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Apply Leave", icon: CalendarCheck },
                { label: "Check Attendance", icon: Clock },
                { label: "View Announcements", icon: Megaphone },
                { label: "Team Directory", icon: Users },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.label)}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border hover:bg-secondary hover:border-primary/30 hover:shadow-sm transition-all group"
                >
                  <div className="p-4 rounded-2xl bg-secondary group-hover:bg-primary/10 transition-colors">
                    <action.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" size={24} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;
