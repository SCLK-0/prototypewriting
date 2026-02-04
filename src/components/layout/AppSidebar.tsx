import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Bell,
  Calendar,
  Megaphone,
  Clock,
  CalendarDays,
  Briefcase,
  DollarSign,
  Building2,
  Heart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface MenuItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: { title: string; href: string }[];
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    label: "Main Menu",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
      },
    ],
  },
  {
    label: "Activity",
    items: [
      {
        title: "Notifications",
        icon: Bell,
        href: "/notifications",
      },
      {
        title: "Calendar",
        icon: Calendar,
        href: "/calendar",
      },
      {
        title: "Announcement",
        icon: Megaphone,
        href: "/announcement",
      },
    ],
  },
  {
    label: "Self Service",
    items: [
      {
        title: "Attendance",
        icon: Clock,
        href: "/attendance",
      },
      {
        title: "Offset",
        icon: CalendarDays,
        href: "/offset",
      },
      {
        title: "Leave",
        icon: Briefcase,
        href: "/leave",
      },
      {
        title: "Compensation",
        icon: DollarSign,
        children: [
          { title: "Salary Pay", href: "/compensation/salary" },
        ],
      },
      {
        title: "Official Business",
        icon: Building2,
        href: "/official-business",
      },
    ],
  },
  {
    label: "My Department",
    items: [
      {
        title: "Announcement",
        icon: Megaphone,
        href: "/department/announcement",
      },
      {
        title: "Engagement",
        icon: Heart,
        href: "/department/engagement",
      },
    ],
  },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

export function AppSidebar({ collapsed, onToggle, isMobile = false }: AppSidebarProps) {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<string[]>(["Main Menu", "Activity", "Self Service", "My Department"]);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  };

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );
  };

  const isActive = (href?: string) => href === location.pathname;

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out sticky top-0 relative",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Area */}
      <div className="h-14 md:h-16 flex items-center px-3 border-b border-sidebar-border">
        <div className="flex items-center gap-2 justify-start">
          {collapsed ? (
            <div className="w-8 h-8 shrink-0">
              <img 
                src="/logo-icon.svg" 
                alt="ABBE Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="h-8 shrink-0">
              <img 
                src="/logo-full.svg" 
                alt="ABBE Technology Solutions Inc." 
                className="h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Toggle button - positioned outside sidebar area to avoid overlap */}
      {!isMobile && (
        <button
          onClick={onToggle}
          className="absolute -right-3.5 top-5 z-20 w-7 h-7 rounded-full border-2 border-primary bg-card flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors shadow-md"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {menuGroups.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <button
                onClick={() => toggleGroup(group.label)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-sidebar-muted uppercase tracking-wider hover:text-sidebar-foreground transition-colors"
              >
                {group.label}
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform",
                    openGroups.includes(group.label) && "rotate-180"
                  )}
                />
              </button>
            )}

            {(collapsed || openGroups.includes(group.label)) && (
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.title}>
                    {item.children ? (
                      <Collapsible
                        open={openSubmenus.includes(item.title)}
                        onOpenChange={() => toggleSubmenu(item.title)}
                      >
                        <CollapsibleTrigger asChild>
                          <button
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                              "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              collapsed && "justify-center px-0"
                            )}
                          >
                            <item.icon className="w-5 h-5 shrink-0" />
                            {!collapsed && (
                              <>
                                <span className="flex-1 text-left">{item.title}</span>
                                <ChevronDown
                                  className={cn(
                                    "w-4 h-4 transition-transform",
                                    openSubmenus.includes(item.title) && "rotate-180"
                                  )}
                                />
                              </>
                            )}
                          </button>
                        </CollapsibleTrigger>
                        {!collapsed && (
                          <CollapsibleContent>
                            <ul className="ml-8 mt-1 space-y-1">
                              {item.children.map((child) => (
                                <li key={child.title}>
                                  <a
                                    href={child.href}
                                    className={cn(
                                      "block px-3 py-2 rounded-lg text-sm transition-colors",
                                      isActive(child.href)
                                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    )}
                                  >
                                    {child.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </CollapsibleContent>
                        )}
                      </Collapsible>
                    ) : (
                      <a
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                          isActive(item.href)
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          collapsed && "justify-center px-0"
                        )}
                      >
                        <item.icon className="w-5 h-5 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
