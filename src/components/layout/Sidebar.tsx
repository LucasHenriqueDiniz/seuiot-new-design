import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  FolderOpen,
  Cpu,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      { id: "sensor-temp-001", name: "Sensor-Temp-001", status: "Online" },
      { id: "pump-control-a1", name: "Pump-Control-A1", status: "Online" },
      {
        id: "pressure-sensor-01",
        name: "Pressure-Sensor-01",
        status: "Offline",
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
      },
      { id: "temp-controller-b", name: "Temp-Controller-B", status: "Online" },
    ],
  },
  {
    id: "smart-home",
    name: "Smart Home Beta",
    devices: [
      { id: "smart-thermostat", name: "Smart-Thermostat", status: "Online" },
      {
        id: "motion-detector-01",
        name: "Motion-Detector-01",
        status: "Online",
      },
    ],
  },
];

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
    navigate(`/devices/${deviceId}`);
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
                <div className="flex items-center">
                  <Link
                    to="/repositories"
                    onClick={() => {
                      if (selectedRepository) {
                        handleClearRepository();
                      }
                      onClose();
                    }}
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
                  </Link>

                  {/* Repository Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-8 w-8 p-0"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {repositories.map((repo) => (
                        <DropdownMenuItem
                          key={repo.id}
                          onClick={() => handleRepositorySelect(repo.id)}
                          className={cn(
                            selectedRepository === repo.id && "bg-accent",
                          )}
                        >
                          <FolderOpen className="h-4 w-4 mr-2" />
                          {repo.name}
                          <Badge
                            variant="outline"
                            className="ml-auto h-4 text-xs"
                          >
                            {repo.devices.length}
                          </Badge>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Selected Repository Display */}
                {selectedRepository && (
                  <div className="mt-2 ml-6 flex items-center space-x-2">
                    <span className="text-sm font-medium text-primary">
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
              </div>

              {/* Devices Section */}
              <div>
                <div className="flex items-center">
                  <Link
                    to="/devices"
                    onClick={() => {
                      if (selectedDevice) {
                        handleClearDevice();
                      }
                      onClose();
                    }}
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
                  </Link>

                  {/* Device Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-8 w-8 p-0"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {getAllDevices().map((device) => (
                        <DropdownMenuItem
                          key={device.id}
                          onClick={() => handleDeviceSelect(device.id)}
                          className={cn(
                            selectedDevice === device.id && "bg-accent",
                          )}
                        >
                          <Cpu className="h-4 w-4 mr-2" />
                          {device.name}
                          <div
                            className={cn(
                              "ml-auto h-2 w-2 rounded-full",
                              device.status === "Online"
                                ? "bg-green-500"
                                : "bg-red-500",
                            )}
                          />
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Selected Device Display */}
                {selectedDevice && (
                  <div className="mt-2 ml-6 flex items-center space-x-2">
                    <span className="text-sm font-medium text-primary">
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
              </div>
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
