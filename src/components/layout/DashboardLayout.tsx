import { useState, useEffect } from "react";
import { AppSidebar } from "./AppSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - fixed position for sticky behavior */}
      <div className={`
        ${isMobile 
          ? `fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`
          : 'fixed inset-y-0 left-0 z-30'
        }
      `}>
        <AppSidebar
          collapsed={isMobile ? false : sidebarCollapsed}
          onToggle={() => isMobile ? setMobileOpen(false) : setSidebarCollapsed(!sidebarCollapsed)}
          isMobile={isMobile}
        />
      </div>

      {/* Main content with margin to account for fixed sidebar */}
      <div 
        className="flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: isMobile ? 0 : (sidebarCollapsed ? '4rem' : '16rem') }}
      >
        <DashboardHeader 
          onMenuClick={() => setMobileOpen(true)}
          showMenuButton={isMobile}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
