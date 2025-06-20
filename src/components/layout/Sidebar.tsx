import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Cpu,
  FolderOpen,
  Home,
  Pin,
  X
} from "lucide-react";
import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRepository: string | null;
  selectedDevice: string | null;
  onSelectRepository: (repoId: string | null) => void;
  onSelectDevice: (deviceId: string | null) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
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
  icon?: ReactNode; // Ícone personalizado para o repositório
}

const repositories: Repository[] = [
  {
    id: "example1",
    name: "EXEMPLO 1",
    icon: <Clock className="h-5 w-5 text-primary" />,
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
    icon: <FolderOpen className="h-5 w-5 text-primary" />,
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
    icon: <Cpu className="h-5 w-5 text-primary" />,
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

// Lista de repositórios pinados pelo usuário
const pinnedRepositories = ["example1", "smart-home"];

export function Sidebar({
  isOpen,
  onClose,
  selectedRepository,
  selectedDevice,
  onSelectRepository,
  onSelectDevice,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [repositoriesExpanded, setRepositoriesExpanded] = useState(false);
  const [devicesExpanded, setDevicesExpanded] = useState(false);
  const [isPinListExpanded, setIsPinListExpanded] = useState(true);

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

  const getSelectedDeviceModel = () => {
    if (!selectedDevice || !selectedRepository) return null;
    const repo = repositories.find((r) => r.id === selectedRepository);
    return repo?.devices.find((d) => d.id === selectedDevice)?.model;
  };

  const getSelectedDeviceIp = () => {
    if (!selectedDevice || !selectedRepository) return null;
    const repo = repositories.find((r) => r.id === selectedRepository);
    return repo?.devices.find((d) => d.id === selectedDevice)?.ip;
  };

  const getSelectedDeviceLastMessage = () => {
    if (!selectedDevice || !selectedRepository) return null;
    const repo = repositories.find((r) => r.id === selectedRepository);
    return repo?.devices.find((d) => d.id === selectedDevice)?.lastMessage;
  };

  const getAllDevices = () => {
    return repositories.flatMap((repo) => repo.devices);
  };

  const getPinnedRepositoryDetails = (repoId: string) => {
    return repositories.find((r) => r.id === repoId);
  };

  const getDefaultDevice = (repoId: string) => {
    const repo = repositories.find((r) => r.id === repoId);
    return repo?.devices[0]?.id || null;
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
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] transform bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto p-4 scrollbar-gutter-stable">
            <nav className="space-y-2">
              {/* Dashboard Link */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/dashboard"
                    onClick={onClose}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActive("/dashboard")
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                        : "text-sidebar-foreground",
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <Home className="h-5 w-5 min-w-5" />
                    <span className={cn("flex-1", isCollapsed && "hidden")}>Dashboard</span>
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">Dashboard</TooltipContent>
                )}
              </Tooltip>

              {/* Pinned Repositories */}
              {pinnedRepositories.length > 0 && (
                <div className="mb-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          "flex items-center justify-between px-3 py-1.5 cursor-pointer hover:bg-sidebar-accent/30 rounded-md overflow-hidden text-nowrap",
                          isCollapsed && "justify-center px-2"
                        )}
                        onClick={() => setIsPinListExpanded(!isPinListExpanded)}
                      >
                        <div className={cn("flex items-center space-x-2", isCollapsed && "justify-center space-x-0")}>
                          <Pin className="h-4 w-4 text-muted-foreground min-w-4" />
                          <span className={cn("text-xs text-muted-foreground font-medium", isCollapsed && "hidden")}>
                            Repositórios Pinados
                          </span>
                        </div>
                        {!isCollapsed && (isPinListExpanded ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        ))}
                      </div>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">Repositórios Pinados</TooltipContent>
                    )}
                  </Tooltip>
                  {isPinListExpanded && !isCollapsed && (
                    <div className="space-y-1 px-4 mt-2">
                      {pinnedRepositories.map((repoId) => {
                        const repo = getPinnedRepositoryDetails(repoId);
                        if (!repo) return null;
                        const defaultDevice = getDefaultDevice(repoId);

                        return (
                        <div
                            key={repoId}
                            className={cn(
                              "flex flex-col space-y-1 rounded-lg px-3 py-2 text-sm transition-colors",
                              selectedRepository === repoId
                                ? "bg-sidebar-accent/50 text-sidebar-foreground"
                                : "hover:bg-sidebar-accent/30 text-sidebar-foreground/80",
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() => handleRepositorySelect(repoId)}
                                    className={cn("flex items-center space-x-2 flex-1", isCollapsed && "justify-center")}
                                  >
                                    {repo.icon ? (
                                      <span className="text-base">{repo.icon}</span>
                                    ) : (
                                      <FolderOpen className="h-4 w-4 text-primary min-w-4" />
                                    )}
                                    <span className={cn("text-sm font-medium truncate", isCollapsed && "hidden")}>
                                      {repo.name}
                                    </span>
                                  </button>
                                </TooltipTrigger>
                                {isCollapsed && (
                                  <TooltipContent side="right">
                                    <div>
                                      <p>{repo.name}</p>
                                      <p className="text-xs">{repo.devices.length} dispositivos</p>
                                    </div>
                                  </TooltipContent>
                                )}
                              </Tooltip>
                            </div>

                            {repo.devices.length > 0 && defaultDevice && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className={cn(
                                      "flex items-center ml-6 cursor-pointer rounded-md px-2 py-1 text-xs",
                                      isCollapsed && "ml-2 justify-center",
                                      selectedDevice === defaultDevice
                                        ? "bg-sidebar-accent/80 text-sidebar-foreground"
                                        : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80"
                                    )}
                                    onClick={() => {
                                      handleRepositorySelect(repoId);
                                      handleDeviceSelect(defaultDevice);
                                    }}
                                  >
                                    <Cpu className="h-3 w-3 mr-1.5 text-primary/80 min-w-3" />
                                    <span className={cn("truncate", isCollapsed && "hidden")}>
                                      {repo.devices[0].name}
                                    </span>
                                    <span
                                      className={cn(
                                        isCollapsed ? "ml-1" : "ml-auto",
                                        "h-2 w-2 rounded-full",
                                        repo.devices[0].status === "Online"
                                          ? "bg-green-500"
                                          : "bg-red-500"
                                      )}
                                    />
                                  </div>
                                </TooltipTrigger>
                                {isCollapsed && (
                                  <TooltipContent side="right">{repo.devices[0].name}</TooltipContent>
                                )}
                              </Tooltip>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Repositories Section */}
              <div>
                {!selectedRepository ? (
                  <div className="flex items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to="/repositories"
                          className={cn(
                            "flex flex-1 items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            isActive("/repositories") && !selectedRepository
                              ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                              : "text-sidebar-foreground",
                            isCollapsed && "justify-center px-2"
                          )}
                        >
                          <FolderOpen className="h-5 w-5 min-w-5" />
                          <span className={cn("flex-1", isCollapsed && "hidden")}>Repositórios</span>
                        </Link>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">Repositórios</TooltipContent>
                      )}
                    </Tooltip>
                    
                    {!isCollapsed && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-8 w-8 p-0"
                            onClick={() => setRepositoriesExpanded(!repositoriesExpanded)}
                          >
                            {repositoriesExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {repositoriesExpanded ? "Recolher lista" : "Expandir lista"}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between px-3 py-2.5">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={cn("flex items-center space-x-2", isCollapsed && "justify-center")}>
                          {selectedRepository && repositories.find(r => r.id === selectedRepository)?.icon ? (
                            <span className="text-lg text-primary">{repositories.find(r => r.id === selectedRepository)?.icon}</span>
                          ) : (
                            <FolderOpen className="h-5 w-5 text-primary min-w-5" />
                          )}
                          <span className={cn("flex-1 text-sm font-medium text-primary truncate", isCollapsed && "hidden")}>
                            {getSelectedRepositoryName()}
                          </span>
                        </div>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          <div>
                            <p>{getSelectedRepositoryName()}</p>
                            <p className="text-xs">
                              {repositories.find((r) => r.id === selectedRepository)?.devices.length} dispositivos
                            </p>
                          </div>
                        </TooltipContent>
                      )}
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={handleClearRepository}
                        >
                          <X className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Desselecionar repositório</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                )}

                {/* Repository List */}
                {repositoriesExpanded && !selectedRepository && (
                  <div className="mt-1 ml-6 space-y-1">
                    {repositories.map((repo) => (
                      <Tooltip key={repo.id}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleRepositorySelect(repo.id)}
                            className={cn(
                              "flex w-full items-center rounded-md px-3 py-1.5 text-sm transition-colors",
                              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              "text-sidebar-foreground/80",
                              isCollapsed && "justify-center px-2"
                            )}
                          >
                            <div className={cn("flex items-center gap-2", isCollapsed && "justify-center")}>
                              {repo.icon ? (
                                <span className="text-base">{repo.icon}</span>
                              ) : (
                                <FolderOpen className="h-4 w-4 text-primary min-w-4" />
                              )}
                              <span className={cn("truncate", isCollapsed && "hidden")}>{repo.name}</span>
                            </div>
                            {!isCollapsed && (
                              <Badge variant="outline" className="text-xs px-1 ml-2">
                                {repo.devices.length}
                              </Badge>
                            )}
                          </button>
                        </TooltipTrigger>
                        {isCollapsed && (
                          <TooltipContent side="right">
                            <div>
                              <p>{repo.name}</p>
                              <p className="text-xs">{repo.devices.length} dispositivos</p>
                            </div>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    ))}
                    <div className="mt-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            to="/repositories/new"
                            className={cn(
                              "flex w-full items-center rounded-md px-3 py-1.5 text-sm text-primary hover:bg-sidebar-accent",
                              isCollapsed && "justify-center px-2"
                            )}
                          >
                            <span className={cn(isCollapsed ? "mr-0" : "mr-1")}>+</span>
                            <span className={cn(isCollapsed && "hidden")}>Novo Repositório</span>
                          </Link>
                        </TooltipTrigger>
                        {isCollapsed && (
                          <TooltipContent side="right">Novo Repositório</TooltipContent>
                        )}
                      </Tooltip>
                    </div>
                  </div>
                )}
              </div>

              {/* Devices Section */}
              <div>
                {!selectedDevice ? (
                  <div className="flex items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to="/devices"
                          className={cn(
                            "flex flex-1 items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            isActive("/devices") && !selectedDevice
                              ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                              : "text-sidebar-foreground",
                            isCollapsed && "justify-center px-2"
                          )}
                        >
                          <Cpu className="h-5 w-5 min-w-5" />
                          <span className={cn("flex-1", isCollapsed && "hidden")}>Dispositivos</span>
                        </Link>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">Dispositivos</TooltipContent>
                      )}
                    </Tooltip>
                    
                    {!isCollapsed && (
                      <Tooltip>
                        <TooltipTrigger asChild>
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
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {devicesExpanded ? "Recolher dispositivos" : "Expandir dispositivos"}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between px-3 py-2.5">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={cn("flex items-center space-x-2", isCollapsed && "justify-center")}>
                          <Cpu className="h-5 w-5 text-primary min-w-5" />
                          <span className={cn("flex-1 text-sm font-medium text-primary truncate", isCollapsed && "hidden")}>
                            {getSelectedDeviceName()}
                          </span>
                        </div>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          <div>
                            <p>Lorem ipsum dolor sit amet</p>
                            <p className="text-xs">IP: {getSelectedDeviceIp()}</p>
                            <p className="text-xs">Última mensagem: {getSelectedDeviceLastMessage()}</p>
                            <p className="text-xs">Modelo: {getSelectedDeviceModel()}</p>
                            <p className="text-xs">Status: {
                              repositories.find(r => r.id === selectedRepository)?.devices
                                .find(d => d.id === selectedDevice)?.status
                            }</p>
                          </div>
                        </TooltipContent>
                      )}
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={handleClearDevice}
                        >
                          <X className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Desselecionar dispositivo</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                )}

                {/* Device List */}
                {devicesExpanded && !selectedDevice && (
                  <div className="mt-1 ml-6 space-y-1">
                    {getAllDevices().map((device) => (
                      <Tooltip key={device.id}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleDeviceSelect(device.id)}
                            className={cn(
                              "flex w-full items-center rounded-md px-3 py-1.5 text-sm transition-colors",
                              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              "text-sidebar-foreground/80",
                              isCollapsed && "justify-center px-2"
                            )}
                          >
                            <div className={cn("flex items-center", isCollapsed && "justify-center")}>
                              <Cpu className={cn("h-3.5 w-3.5 min-w-3.5", !isCollapsed && "mr-2", "text-primary/80", isCollapsed && "mr-0")} />
                              <span className={cn("truncate", isCollapsed && "hidden")}>{device.name}</span>
                              <span
                                className={cn(
                                  !isCollapsed ? "ml-2" : "ml-1", 
                                  "h-2 w-2 rounded-full",
                                  device.status === "Online"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                )}
                              />
                            </div>
                            {!isCollapsed && (
                              <span className="text-xs text-muted-foreground ml-2">
                                {device.model}
                              </span>
                            )}
                          </button>
                        </TooltipTrigger>
                        {isCollapsed && (
                          <TooltipContent side="right">
                            <div className="space-y-1">
                              <p className="font-medium">{device.name}</p>
                              <p className="text-xs">{device.model}</p>
                              <p className="text-xs">{device.status}</p>
                            </div>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    ))}
                    <div className="mt-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            to="/devices"
                            className={cn(
                              "flex w-full items-center rounded-md px-3 py-1.5 text-sm text-primary hover:bg-sidebar-accent",
                              isCollapsed && "justify-center px-2"
                            )}
                          >
                            <span className={cn(isCollapsed ? "mr-0" : "mr-1")}>+</span>
                            <span className={cn(isCollapsed && "hidden")}>Novo Dispositivo</span>
                          </Link>
                        </TooltipTrigger>
                        {isCollapsed && (
                          <TooltipContent side="right">Novo Dispositivo</TooltipContent>
                        )}
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            to="/firmware-install"
                            className={cn(
                              "flex w-full items-center rounded-md px-3 py-1.5 text-sm text-primary hover:bg-sidebar-accent mt-1",
                              isCollapsed && "justify-center px-2"
                            )}
                          >
                            <span className={cn(isCollapsed ? "mr-0" : "mr-1")}>⚙️</span>
                            <span className={cn(isCollapsed && "hidden")}>Instalar Firmware</span>
                          </Link>
                        </TooltipTrigger>
                        {isCollapsed && (
                          <TooltipContent side="right">Instalar Firmware</TooltipContent>
                        )}
                      </Tooltip>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Footer Area */}
          <div className={cn("border-t border-sidebar-border", isCollapsed ? "p-2" : "p-4")}>
            {selectedDevice ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="rounded-lg bg-primary/10 p-3 relative">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-xs font-medium text-foreground">
                          {getSelectedDeviceName()}
                        </p>
                        {!isCollapsed && (
                          <>
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Modelo:</span>
                                <span className="font-medium">
                                  {getSelectedDeviceModel()}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">IP:</span>
                                <span className="font-medium">{getSelectedDeviceIp()}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Última msg:</span>
                                <span className="font-medium text-xs truncate max-w-[120px]">
                                  {getSelectedDeviceLastMessage()}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 text-xs">
                              <span className="text-muted-foreground">Repositório: </span>
                              <Link
                                to={`/repositories/${selectedRepository}`}
                                className="text-primary hover:underline"
                              >
                                {getSelectedRepositoryName()}
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                      {!isCollapsed && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 text-destructive hover:text-destructive -mt-1 -mr-1"
                          onClick={handleClearDevice}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    <div className="space-y-1 max-w-xs">
                      <p className="font-medium">{getSelectedDeviceName()}</p>
                      <p className="text-xs">Modelo: {getSelectedDeviceModel()}</p>
                      <p className="text-xs">IP: {getSelectedDeviceIp()}</p>
                      <p className="text-xs">Repo: {getSelectedRepositoryName()}</p>
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            )            : selectedRepository ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="rounded-lg bg-primary/10 p-3 relative">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-xs font-medium text-foreground">
                          {getSelectedRepositoryName()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {
                            repositories.find((r) => r.id === selectedRepository)
                              ?.devices.length
                          }{" "}
                          dispositivos conectados
                        </p>
                        {!isCollapsed && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {repositories
                              .find((r) => r.id === selectedRepository)
                              ?.devices.slice(0, 2)
                              .map((device) => (
                                <button
                                  key={device.id}
                                  onClick={() => handleDeviceSelect(device.id)}
                                  className="rounded bg-sidebar-accent/50 px-1.5 py-0.5 text-xs hover:bg-sidebar-accent"
                                >
                                  {device.name}
                                </button>
                              ))}
                            {(
                              repositories.find((r) => r.id === selectedRepository)
                                ?.devices.length || 0
                            ) > 2 && (
                              <button
                                onClick={() =>
                                  navigate(
                                    `/repositories/${selectedRepository}/devices`,
                                  )
                                }
                                className="rounded bg-sidebar-accent/30 px-1.5 py-0.5 text-xs hover:bg-sidebar-accent text-muted-foreground"
                              >
                                +{" "}
                                {(
                                  repositories.find((r) => r.id === selectedRepository)
                                    ?.devices.length || 0
                                ) - 2}{" "}
                                mais
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                      {!isCollapsed && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 text-destructive hover:text-destructive -mt-1 -mr-1"
                          onClick={handleClearRepository}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    <div className="space-y-1 max-w-xs">
                      <p className="font-medium">{getSelectedRepositoryName()}</p>
                      <p className="text-xs">{repositories.find((r) => r.id === selectedRepository)?.devices.length} dispositivos conectados</p>
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            )            : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="rounded-lg bg-sidebar-accent p-3">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                      <p className="text-xs font-medium text-sidebar-accent-foreground">
                        {isCollapsed ? "" : "Sistema Online"}
                      </p>
                    </div>
                    {!isCollapsed && (
                      <p className="text-xs text-sidebar-accent-foreground/70 mt-1">
                        Última sincronização: há 2 min
                      </p>
                    )}
                  </div>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    <div className="space-y-1">
                      <p className="font-medium">Sistema Online</p>
                      <p className="text-xs">Última sincronização: há 2 min</p>
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            )}
          </div>
          
          {/* Toggle collapse button */}
          <div className="border-t border-sidebar-border p-2 flex justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="h-8 w-8 p-0 rounded-full"
                >
                  {isCollapsed ? (
                    <ChevronsRight className="h-4 w-4" />
                  ) : (
                    <ChevronsLeft className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{isCollapsed ? "Expandir sidebar" : "Recolher sidebar"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </aside>
    </>
  );
}
