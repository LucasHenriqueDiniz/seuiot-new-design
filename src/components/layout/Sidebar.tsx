import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  FolderOpen,
  Cpu,
  ChevronDown,
  ChevronRight,
  X,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRepository: string | null;
  selectedDevice: string | null;
  onSelectRepository: (repoId: string | null) => void;
  onSelectDevice: (deviceId: string | null) => void;
}

interface Device {
  id: string;
  name: string;
  model: string;
  version: string;
  ip: string;
  lastMessage: string;
  location: string;
  status: "Online" | "Offline";
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
        id: "thing3",
        name: "Thing 3",
        model: "ESP32",
        version: "1.0.3",
        ip: "192.168.1.8",
        lastMessage: "08/02/2025, 17:42:01",
        location: "Camaquã, State of Rio Grande do Sul, Brazil",
        status: "Online",
      },
      {
        id: "sensor-temp-001",
        name: "Sensor Temp 001",
        model: "ESP32-S3",
        version: "1.2.1",
        ip: "192.168.1.15",
        lastMessage: "08/02/2025, 17:41:45",
        location: "Porto Alegre, State of Rio Grande do Sul, Brazil",
        status: "Online",
      },
    ],
  },
  {
    id: "example2",
    name: "EXEMPLO 2",
    devices: [
      {
        id: "humidity-device",
        name: "Sensor Umidade",
        model: "ESP32-C3",
        version: "1.1.0",
        ip: "192.168.1.22",
        lastMessage: "08/02/2025, 17:40:12",
        location: "Pelotas, State of Rio Grande do Sul, Brazil",
        status: "Offline",
      },
    ],
  },
  {
    id: "smart-home",
    name: "Smart Home Beta",
    devices: [
      {
        id: "smart-thermostat",
        name: "Termostato Casa",
        model: "ESP32",
        version: "2.0.1",
        ip: "192.168.1.35",
        lastMessage: "08/02/2025, 17:43:15",
        location: "Santa Maria, State of Rio Grande do Sul, Brazil",
        status: "Online",
      },
    ],
  },
];

const recentRepositories = ["example1", "smart-home"]; // Recently used repos

export function Sidebar({
  isOpen,
  onClose,
  selectedRepository,
  selectedDevice,
  onSelectRepository,
  onSelectDevice,
}: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [repositoriesExpanded, setRepositoriesExpanded] = useState(false);
  const [devicesExpanded, setDevicesExpanded] = useState(false);

  const isActive = (href: string) => {
    if (
      href === "/dashboard" &&
      (location.pathname === "/" || location.pathname === "/dashboard")
    )
      return true;
    return location.pathname.startsWith(href);
  };

  const handleRepositorySelect = (repoId: string) => {
    onSelectRepository(repoId);
    navigate(`/repositories/${repoId}`);
    onClose();
  };

  const handleDeviceSelect = (deviceId: string) => {
    onSelectDevice(deviceId);
    onClose();
  };

  const handleClearRepository = () => {
    onSelectRepository(null);
    navigate("/repositories");
  };

  const handleClearDevice = () => {
    onSelectDevice(null);
    navigate("/devices");
  };

  const getSelectedRepositoryName = () => {
    if (!selectedRepository) return null;
    return repositories.find((r) => r.id === selectedRepository)?.name;
  };

  const getSelectedDeviceName = () => {
    if (!selectedDevice || !selectedRepository) return null;
    const repo = repositories.find((r) => r.id === selectedRepository);
    return repo?.devices.find((d) => d.id === selectedDevice)?.name;
  };

  const getAllDevices = () => {
    return repositories.flatMap((repo) => repo.devices);
  };

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
          <div className="flex-1 overflow-y-auto p-4 scrollbar-gutter-stable">
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

              {/* Recent Repositories */}
              {recentRepositories.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 px-3 py-1.5">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-medium">
                      Usados Recentemente
                    </span>
                  </div>
                  <div className="space-y-1">
                    {recentRepositories.map((repoId) => {
                      const repo = repositories.find((r) => r.id === repoId);
                      if (!repo) return null;
                      return (
                        <button
                          key={repoId}
                          onClick={() => handleRepositorySelect(repoId)}
                          className={cn(
                            "flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent",
                            selectedRepository === repoId &&
                              "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                          )}
                        >
                          <FolderOpen className="h-4 w-4" />
                          <span className="flex-1 truncate">{repo.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Repositories Section */}
              <div>
                {!selectedRepository ? (
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        setRepositoriesExpanded(!repositoriesExpanded)
                      }
                      className={cn(
                        "flex flex-1 items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
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
                    </button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-8 w-8 p-0"
                      onClick={() =>
                        setRepositoriesExpanded(!repositoriesExpanded)
                      }
                    >
                      {repositoriesExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 px-3 py-2.5">
                    <FolderOpen className="h-5 w-5 text-primary" />
                    <span className="flex-1 text-sm font-medium text-primary">
                      {getSelectedRepositoryName()}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-destructive"
                      onClick={handleClearRepository}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}

                {/* Repository List */}
                {repositoriesExpanded && !selectedRepository && (
                  <div className="mt-1 ml-6 space-y-1">
                    {repositories.map((repo) => (
                      <button
                        key={repo.id}
                        onClick={() => handleRepositorySelect(repo.id)}
                        className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent text-sidebar-foreground/80"
                      >
                        <FolderOpen className="h-4 w-4" />
                        <span className="flex-1">{repo.name}</span>
                        <Badge variant="outline" className="h-4 text-xs">
                          {repo.devices.length}
                        </Badge>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Devices Section */}
              <div>
                {!selectedDevice ? (
                  <div className="flex items-center">
                    <button
                      onClick={() => setDevicesExpanded(!devicesExpanded)}
                      className={cn(
                        "flex flex-1 items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive("/devices") && !selectedDevice
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                          : "text-sidebar-foreground",
                      )}
                    >
                      <Cpu className="h-5 w-5" />
                      <span className="flex-1">Dispositivos</span>
                      <Badge variant="secondary" className="h-5 text-xs">
                        {getAllDevices().length}
                      </Badge>
                    </button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-8 w-8 p-0"
                      onClick={() => setDevicesExpanded(!devicesExpanded)}
                    >
                      {devicesExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 px-3 py-2.5">
                    <Cpu className="h-5 w-5 text-primary" />
                    <span className="flex-1 text-sm font-medium text-primary">
                      {getSelectedDeviceName()}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-destructive"
                      onClick={handleClearDevice}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}

                {/* Device List */}
                {devicesExpanded && !selectedDevice && (
                  <div className="mt-1 ml-6 space-y-1">
                    {getAllDevices().map((device) => (
                      <button
                        key={device.id}
                        onClick={() => handleDeviceSelect(device.id)}
                        className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent text-sidebar-foreground/80"
                      >
                        <Cpu className="h-4 w-4" />
                        <span className="flex-1 truncate">{device.name}</span>
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full",
                            device.status === "Online"
                              ? "bg-green-500"
                              : "bg-red-500",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="border-t border-sidebar-border p-4">
            {selectedDevice ? (
              <div className="rounded-lg bg-primary/10 p-3 relative">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-primary">
                      Dispositivo Selecionado:
                    </p>
                    <p className="text-xs text-primary/80 font-medium mt-1">
                      {getSelectedDeviceName()}
                    </p>
                    <p className="text-xs text-primary/60 mt-1">
                      {(() => {
                        const device = getAllDevices().find(
                          (d) => d.id === selectedDevice,
                        );
                        const repo = repositories.find((r) =>
                          r.devices.some((dev) => dev.id === selectedDevice),
                        );
                        return device && repo
                          ? `${device.model} • ${device.ip}`
                          : "";
                      })()}
                    </p>
                    {selectedRepository && (
                      <p className="text-xs text-primary/60 mt-1">
                        Repo:{" "}
                        {
                          repositories.find((r) => r.id === selectedRepository)
                            ?.name
                        }
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 text-destructive hover:text-destructive -mt-1 -mr-1"
                    onClick={handleClearDevice}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ) : selectedRepository ? (
              <div className="rounded-lg bg-primary/10 p-3 relative">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-primary">
                      Repositório Selecionado:
                    </p>
                    <p className="text-xs text-primary/80 font-medium mt-1">
                      {getSelectedRepositoryName()}
                    </p>
                    <p className="text-xs text-primary/60 mt-1">
                      {
                        repositories.find((r) => r.id === selectedRepository)
                          ?.devices.length
                      }{" "}
                      dispositivos
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 text-destructive hover:text-destructive -mt-1 -mr-1"
                    onClick={handleClearRepository}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded-lg bg-sidebar-accent p-3">
                <p className="text-xs font-medium text-sidebar-accent-foreground">
                  Sistema Online
                </p>
                <p className="text-xs text-sidebar-accent-foreground/70 mt-1">
                  Última sincronização: há 2 min
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
