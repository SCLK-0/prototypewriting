import { Bell, Search, MessageSquare, Calendar, FileText, AlertCircle, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  showMenuButton: boolean;
}

const notifications = [
  {
    id: 1,
    title: "Leave Request Approved",
    description: "Your leave request for Feb 10-12 has been approved.",
    time: "5 mins ago",
    icon: Calendar,
    unread: true,
  },
  {
    id: 2,
    title: "New Announcement",
    description: "Company town hall meeting scheduled for Friday.",
    time: "1 hour ago",
    icon: MessageSquare,
    unread: true,
  },
  {
    id: 3,
    title: "Payslip Available",
    description: "Your January 2026 payslip is now available.",
    time: "2 hours ago",
    icon: FileText,
    unread: false,
  },
  {
    id: 4,
    title: "Attendance Reminder",
    description: "Please clock in before 9:00 AM.",
    time: "Yesterday",
    icon: AlertCircle,
    unread: false,
  },
];

export function DashboardHeader({ onMenuClick, showMenuButton }: DashboardHeaderProps) {
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleSignOut = () => {
    navigate("/login");
  };

  return (
    <header className="h-14 md:h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile Menu Button */}
        {showMenuButton && (
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Search Bar */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="w-48 md:w-64 pl-10 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-white flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-popover">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <span className="text-xs text-primary cursor-pointer hover:underline">Mark all as read</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex items-start gap-3 p-3 cursor-pointer">
                <div className={`p-2 rounded-full ${notification.unread ? 'bg-primary/10' : 'bg-secondary'}`}>
                  <notification.icon className={`w-4 h-4 ${notification.unread ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <p className={`text-sm ${notification.unread ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{notification.description}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
                {notification.unread && (
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center text-primary text-sm cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:bg-secondary rounded-lg px-2 py-1.5 transition-colors">
              <Avatar className="w-9 h-9">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  R
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-foreground">Renier</p>
                <p className="text-xs text-muted-foreground">Web Developer</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover p-2">
            <div className="flex flex-col items-center gap-2 p-3 border-b border-border mb-2">
              <Avatar className="w-16 h-16">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  R
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-semibold text-foreground">Renier</p>
                <p className="text-xs text-muted-foreground">renier@abbe.com.ph</p>
                <p className="text-xs text-muted-foreground">Web Developer</p>
                <p className="text-xs text-primary">ABBE Technology Solution Inc.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <DropdownMenuItem asChild className="flex-1 justify-center cursor-pointer">
                <a href="/profile">Profile</a>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleSignOut}
                className="flex-1 justify-center text-destructive cursor-pointer"
              >
                Sign out
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
