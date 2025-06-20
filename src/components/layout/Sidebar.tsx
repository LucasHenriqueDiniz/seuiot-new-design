import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FolderOpen, Cpu, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: Home,
  },
  {
    href: "/repositories",
    label: "Repositórios",
    icon: FolderOpen,
    badge: "5",
    children: [
      { href: "/repositories/example1", label: "EXEMPLO 1", icon: FolderOpen },
      { href: "/repositories/example2", label: "EXEMPLO 2", icon: FolderOpen },
    ],
  },
  {
    href: "/devices",
    label: "Dispositivos",
    icon: Cpu,
    badge: "12",
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href],
    );
  };

  const isActive = (href: string) => {
    if (href === "/dashboard" && location.pathname === "/") return true;
    return location.pathname.startsWith(href);
  };

  const isExpanded = (href: string) => expandedItems.includes(href);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <div key={item.href}>
                  <div className="flex items-center">
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex flex-1 items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive(item.href)
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                          : "text-sidebar-foreground",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="h-5 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                    {item.children && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-8 w-8 p-0"
                        onClick={() => toggleExpanded(item.href)}
                      >
                        {isExpanded(item.href) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>

                  {item.children && isExpanded(item.href) && (
                    <div className="mt-1 ml-6 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={onClose}
                          className={cn(
                            "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            isActive(child.href)
                              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                              : "text-sidebar-foreground/80",
                          )}
                        >
                          <child.icon className="h-4 w-4" />
                          <span>{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="border-t border-sidebar-border p-4">
            <div className="rounded-lg bg-sidebar-accent p-3">
              <p className="text-xs font-medium text-sidebar-accent-foreground">
                Sistema Online
              </p>
              <p className="text-xs text-sidebar-accent-foreground/70 mt-1">
                Última sincronização: há 2 min
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
