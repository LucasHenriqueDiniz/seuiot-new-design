import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  FolderOpen,
  Cpu,
  ChevronDown,
  ChevronRight,
  X,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Device {
  id: string;
  name: string;
  status: "Online" | "Offline";
  repositoryId: string;
}

interface Repository {
  id: string;
  name: string;
  devices: Device[];
}

const repositories: Repository[] = [
  {
    id: "example1",
    name: "EXEMPLO 1",
    devices: [
      {
        id: "sensor-temp-001",
        name: "Sensor-Temp-001",
        status: "Online",
        repositoryId: "example1",
      },
      {
        id: "pump-control-a1",
        name: "Pump-Control-A1",
        status: "Online",
        repositoryId: "example1",
      },
      {
        id: "pressure-sensor-01",
        name: "Pressure-Sensor-01",
        status: "Offline",
        repositoryId: "example1",
      },
    ],
  },
  {
    id: "example2",
    name: "EXEMPLO 2",
    devices: [
      {
        id: "humidity-sensor-02",
        name: "Humidity-Sensor-02",
        status: "Online",
        repositoryId: "example2",
      },
      {
        id: "temp-controller-b",
        name: "Temp-Controller-B",
        status: "Online",
        repositoryId: "example2",
      },
    ],
  },
  {
    id: "smart-home",
    name: "Smart Home Beta",
    devices: [
      {
        id: "smart-thermostat",
        name: "Smart-Thermostat",
        status: "Online",
        repositoryId: "smart-home",
      },
      {
        id: "motion-detector-01",
        name: "Motion-Detector-01",
        status: "Online",
        repositoryId: "smart-home",
      },
    ],
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedRepositories, setExpandedRepositories] = useState<string[]>(
    [],
  );
  const [selectedRepository, setSelectedRepository] = useState<string | null>(
    null,
  );
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const toggleRepositoryExpanded = (repoId: string) => {
    setExpandedRepositories((prev) =>
      prev.includes(repoId)
        ? prev.filter((id) => id !== repoId)
        : [...prev, repoId],
    );
  };

  const selectRepository = (repoId: string) => {
    setSelectedRepository(repoId);
    setSelectedDevice(null);
    navigate(`/repositories/${repoId}`);
    onClose();
  };

  const selectDevice = (deviceId: string, repoId: string) => {
    setSelectedRepository(repoId);
    setSelectedDevice(deviceId);
    navigate(`/repositories/${repoId}?device=${deviceId}`);
    onClose();
  };

  const deselectRepository = () => {
    setSelectedRepository(null);
    setSelectedDevice(null);
    navigate("/repositories");
  };

  const isActive = (href: string) => {
    if (href === "/dashboard" && location.pathname === "/") return true;
    return location.pathname.startsWith(href);
  };

  const isRepositoryExpanded = (repoId: string) =>
    expandedRepositories.includes(repoId);

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
              {/* Dashboard Link */}
              <Link
                to="/dashboard"
                onClick={onClose}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive("/dashboard")
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground",
                )}
              >
                <Home className="h-5 w-5" />
                <span className="flex-1">Dashboard</span>
              </Link>

              {/* Repositories Section */}
              <div>
                <Link
                  to="/repositories"
                  onClick={() => {
                    if (selectedRepository) {
                      deselectRepository();
                    }
                    onClose();
                  }}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive("/repositories") && !selectedRepository
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                      : "text-sidebar-foreground",
                  )}
                >
                  <FolderOpen className="h-5 w-5" />
                  <span className="flex-1">Repositórios</span>
                  <Badge variant="secondary" className="h-5 text-xs">
                    {repositories.length}
                  </Badge>
                </Link>

                {/* Repository List */}
                <div className="mt-2 ml-4 space-y-1">
                  {repositories.map((repo) => (
                    <div key={repo.id}>
                      <div className="flex items-center">
                        <button
                          onClick={() => selectRepository(repo.id)}
                          className={cn(
                            "flex flex-1 items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent",
                            selectedRepository === repo.id
                              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                              : "text-sidebar-foreground/80",
                          )}
                        >
                          <FolderOpen className="h-4 w-4" />
                          <span className="flex-1">{repo.name}</span>
                          <Badge variant="outline" className="h-4 text-xs">
                            {repo.devices.length}
                          </Badge>
                        </button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-6 w-6 p-0"
                          onClick={() => toggleRepositoryExpanded(repo.id)}
                        >
                          {isRepositoryExpanded(repo.id) ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )}
                        </Button>

                        {selectedRepository === repo.id && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-6 w-6 p-0 text-destructive hover:text-destructive"
                            onClick={deselectRepository}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>

                      {/* Devices List */}
                      {isRepositoryExpanded(repo.id) && (
                        <div className="mt-1 ml-4 space-y-1">
                          {repo.devices.map((device) => (
                            <button
                              key={device.id}
                              onClick={() => selectDevice(device.id, repo.id)}
                              className={cn(
                                "flex w-full items-center space-x-2 rounded-lg px-3 py-1.5 text-xs transition-colors hover:bg-sidebar-accent",
                                selectedDevice === device.id
                                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                  : "text-sidebar-foreground/70",
                              )}
                            >
                              <Cpu className="h-3 w-3" />
                              <span className="flex-1 truncate">
                                {device.name}
                              </span>
                              {device.status === "Online" ? (
                                <Wifi className="h-3 w-3 text-green-500" />
                              ) : (
                                <WifiOff className="h-3 w-3 text-red-500" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Devices Link */}
              <Link
                to="/devices"
                onClick={onClose}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive("/devices")
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground",
                )}
              >
                <Cpu className="h-5 w-5" />
                <span className="flex-1">Dispositivos</span>
                <Badge variant="secondary" className="h-5 text-xs">
                  {repositories.reduce(
                    (total, repo) => total + repo.devices.length,
                    0,
                  )}
                </Badge>
              </Link>
            </nav>
          </div>

          {/* Selection Status */}
          {(selectedRepository || selectedDevice) && (
            <div className="border-t border-sidebar-border p-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <p className="text-xs font-medium text-primary">Selecionado:</p>
                {selectedDevice ? (
                  <p className="text-xs text-primary/80 mt-1">
                    {
                      repositories
                        .find((r) => r.id === selectedRepository)
                        ?.devices.find((d) => d.id === selectedDevice)?.name
                    }
                  </p>
                ) : selectedRepository ? (
                  <p className="text-xs text-primary/80 mt-1">
                    {
                      repositories.find((r) => r.id === selectedRepository)
                        ?.name
                    }
                  </p>
                ) : null}
              </div>
            </div>
          )}

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
