import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  selectedRepository?: string | null;
  selectedDevice?: string | null;
  onSelectRepository?: (repoId: string | null) => void;
  onSelectDevice?: (deviceId: string | null) => void;
}

export function Layout({
  children,
  title,
  selectedRepository = null,
  selectedDevice = null,
  onSelectRepository = () => {},
  onSelectDevice = () => {},
}: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Header
        title={title}
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        selectedRepository={selectedRepository}
        selectedDevice={selectedDevice}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        selectedRepository={selectedRepository}
        selectedDevice={selectedDevice}
        onSelectRepository={onSelectRepository}
        onSelectDevice={onSelectDevice}
      />

      <main
        className={cn(
          "pt-16 transition-all duration-300 ease-in-out",
          "lg:pl-64", // Always offset by sidebar on large screens
        )}
      >
        <div className="container mx-auto p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}
