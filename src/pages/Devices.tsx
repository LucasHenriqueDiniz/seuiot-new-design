// filepath: c:\Users\lucas\Documents\GitHub\seuiot-new-design\src\pages\Devices.tsx
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  X,
  Search,
  MoreVertical,
  Wifi,
  WifiOff,
  Gauge,
  Thermometer,
  Zap,
  Cpu,
  Check,
  Activity,
  AlertTriangle,
  Upload,
  RefreshCw,
  Loader2,
  Battery,
  LayoutGrid,
  List,
} from "lucide-react";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const devices = [
  {
    id: 1,
    name: "Sensor-Temp-001",
    type: "Sensor de Temperatura",
    repository: "EXEMPLO 1",
    status: "Online",
    battery: null,
    lastSeen: "há 30s",
    location: "Linha de Produção A",
    value: "23.5°C",
  },
  {
    id: 2,
    name: "Pump-Control-A1",
    type: "Controlador de Bomba",
    repository: "EXEMPLO 1",
    status: "Online",
    battery: null,
    lastSeen: "há 1m",
    location: "Setor Industrial",
    value: "Ativo",
  },
  {
    id: 3,
    name: "Humidity-Sensor-02",
    type: "Sensor de Umidade",
    repository: "EXEMPLO 2",
    status: "Offline",
    battery: null,
    lastSeen: "há 2h",
    location: "Estufa B",
    value: "N/A",
  },
  {
    id: 4,
    name: "Smart-Thermostat",
    type: "Termostato Inteligente",
    repository: "Smart Home Beta",
    status: "Online",
    battery: null,
    lastSeen: "há 15s",
    location: "Sala Principal",
    value: "22.0°C",
  },
  {
    id: 5,
    name: "Energy-Monitor-Main",
    type: "Monitor de Energia",
    repository: "Energy Monitor",
    status: "Manutenção",
    battery: null,
    lastSeen: "há 45m",
    location: "Quadro Principal",
    value: "450W",
  },
  {
    id: 6,
    name: "Motion-Detector-01",
    type: "Detector de Movimento",
    repository: "Smart Home Beta",
    status: "Online",
    battery: 67,
    lastSeen: "há 2m",
    location: "Entrada Principal",
    value: "Inativo",
  },
];

const firmwareVersions = [
  { id: "v1.0.0", name: "v1.0.0 (Estável)" },
  { id: "v1.1.0", name: "v1.1.0 (Beta)" },
  { id: "v1.2.0", name: "v1.2.0 (Dev)" },
];

const repositories = [
  { id: "example1", name: "EXEMPLO 1" },
  { id: "example2", name: "EXEMPLO 2" },
  { id: "smart-home", name: "Smart Home Beta" },
  { id: "energy-monitor", name: "Energy Monitor" },
];

const statusColors = {
  Online: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Offline: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  Manutenção:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
};

const getDeviceIcon = (type: string) => {
  if (type.includes("Temperatura") || type.includes("Termostato"))
    return Thermometer;
  if (type.includes("Energia") || type.includes("Monitor")) return Zap;
  if (type.includes("Controlador") || type.includes("Bomba")) return Gauge;
  return Cpu;
};

interface DevicesProps {
  selectedRepository: string | null;
  selectedDevice: string | null;
  onSelectRepository: (repoId: string | null) => void;
  onSelectDevice: (deviceId: string | null) => void;
}

export default function Devices({
  selectedRepository,
  selectedDevice,
  onSelectRepository,
  onSelectDevice,
}: DevicesProps) {
  const navigate = useNavigate();
  const [isInstallingFirmware, setIsInstallingFirmware] = useState(false);
  const [firmwareProgress, setFirmwareProgress] = useState(0);
  const [firmwareStatus, setFirmwareStatus] = useState<"idle" | "installing" | "success" | "error">("idle");
  const [selectedFirmware, setSelectedFirmware] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [deviceName, setDeviceName] = useState("");
  const [showFirmwareDialog, setShowFirmwareDialog] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const handleInstallFirmware = async () => {
    if (!selectedFirmware || !selectedRepo || !deviceName) return;
    
    try {
      setFirmwareStatus("installing");
      setFirmwareProgress(0);
      setIsInstallingFirmware(true);

      // Simulating the WebSerial connection and firmware installation
      for (let i = 0; i <= 100; i += 5) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setFirmwareProgress(i);
      }

      // Success after completion
      setFirmwareStatus("success");
      setTimeout(() => {
        setShowFirmwareDialog(false);
        setIsInstallingFirmware(false);
        setFirmwareProgress(0);
        setFirmwareStatus("idle");
      }, 1500);
    } catch (error) {
      console.error("Erro ao instalar firmware:", error);
      setFirmwareStatus("error");
    }
  };

  const handleConnectSerial = async () => {
    // Simulating WebSerial API
    try {
      console.log("Serial port connected");
      setShowFirmwareDialog(true);
    } catch (error) {
      console.error("Erro ao conectar à porta serial:", error);
    }
  };
  
  const resetFirmwareInstall = () => {
    setFirmwareStatus("idle");
    setFirmwareProgress(0);
    setIsInstallingFirmware(false);
    setSelectedFirmware(null);
    setSelectedRepo(null);
    setDeviceName("");
  };
  
  return (
    <Layout
      title="Dispositivos"
      selectedRepository={selectedRepository}
      selectedDevice={selectedDevice}
      onSelectRepository={onSelectRepository}
      onSelectDevice={onSelectDevice}
    >
      <div className="space-y-6">
        {/* Header */}
        <PageHeader
          title="Dispositivos"
          description="Monitore e gerencie todos os seus dispositivos IoT conectados"
          buttons={[
            {
              label: "Instalar Firmware",
              icon: Download,
              onClick: () => navigate("/firmware-install"),
              variant: "default"
            }
          ]}
          withSearch={true}
          searchPlaceholder="Buscar dispositivos..."
        />

        {/* Dialog for firmware installation */}
        <Dialog open={showFirmwareDialog} onOpenChange={setShowFirmwareDialog}>
          <DialogTrigger asChild className="hidden">
            <Button className="w-fit hidden" onClick={handleConnectSerial}>
              Instalar Firmware
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Instalação de Firmware</DialogTitle>
              <DialogDescription>
                Instalação via WebSerial - Conecte seu dispositivo à porta USB
              </DialogDescription>
            </DialogHeader>
            
            {firmwareStatus === "installing" ? (
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <p>Instalando firmware... {firmwareProgress}%</p>
                </div>
                <Progress value={firmwareProgress} />
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Importante</AlertTitle>
                  <AlertDescription>
                    Não desconecte o dispositivo durante a instalação.
                  </AlertDescription>
                </Alert>
              </div>
            ) : firmwareStatus === "success" ? (
              <div className="space-y-4 py-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-lg font-medium text-center">Firmware instalado com sucesso!</p>
                  <p className="text-center text-muted-foreground">
                    O dispositivo "{deviceName}" foi configurado e está pronto para uso.
                  </p>
                </div>
              </div>
            ) : firmwareStatus === "error" ? (
              <div className="space-y-4 py-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                    <X className="h-6 w-6 text-red-600" />
                  </div>
                  <p className="text-lg font-medium text-center">Falha na instalação</p>
                  <p className="text-center text-muted-foreground">
                    Ocorreu um erro ao instalar o firmware. Por favor, tente novamente.
                  </p>
                  <Button variant="outline" onClick={resetFirmwareInstall}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Tentar Novamente
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <label htmlFor="device-name" className="text-sm font-medium">
                    Nome do Dispositivo
                  </label>
                  <Input 
                    id="device-name" 
                    placeholder="Ex: Sensor Temperatura 01"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="firmware-version" className="text-sm font-medium">
                    Versão do Firmware
                  </label>
                  <Select onValueChange={setSelectedFirmware}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a versão" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Versões disponíveis</SelectLabel>
                        {firmwareVersions.map((version) => (
                          <SelectItem key={version.id} value={version.id}>
                            {version.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="repository" className="text-sm font-medium">
                    Repositório Vinculado
                  </label>
                  <Select onValueChange={setSelectedRepo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o repositório" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Repositórios</SelectLabel>
                        {repositories.map((repo) => (
                          <SelectItem key={repo.id} value={repo.id}>
                            {repo.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            <DialogFooter>
              {firmwareStatus === "idle" && (
                <>
                  <Button variant="outline" onClick={() => setShowFirmwareDialog(false)}>
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleInstallFirmware}
                    disabled={!selectedFirmware || !selectedRepo || !deviceName}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Instalar Firmware
                  </Button>
                </>
              )}
              
              {firmwareStatus === "success" && (
                <Button onClick={() => setShowFirmwareDialog(false)}>
                  Concluir
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Filters with List/Card Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-row gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Repositório</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Todos</DropdownMenuItem>
                <DropdownMenuItem>EXEMPLO 1</DropdownMenuItem>
                <DropdownMenuItem>EXEMPLO 2</DropdownMenuItem>
                <DropdownMenuItem>Smart Home Beta</DropdownMenuItem>
                <DropdownMenuItem>Energy Monitor</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Status</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Todos</DropdownMenuItem>
                <DropdownMenuItem>Online</DropdownMenuItem>
                <DropdownMenuItem>Offline</DropdownMenuItem>
                <DropdownMenuItem>Manutenção</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={viewMode === "card" ? "default" : "outline"} 
              size="icon"
              className="h-9 w-9"
              onClick={() => setViewMode("card")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "outline"} 
              size="icon" 
              className="h-9 w-9"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Device Cards or List */}
        {viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device) => {
              const DeviceIcon = getDeviceIcon(device.type);
              return (
                <Card
                  key={device.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <DeviceIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{device.name}</h3>
                          <p className="text-xs text-muted-foreground">{device.type}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Detalhes</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Atualizar Firmware</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Remover</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge
                        className={
                          statusColors[device.status as keyof typeof statusColors]
                        }
                      >
                        <div className="flex items-center space-x-1">
                          {device.status === "Online" ? (
                            <Wifi className="h-3 w-3 mr-1" />
                          ) : device.status === "Offline" ? (
                            <WifiOff className="h-3 w-3 mr-1" />
                          ) : (
                            <AlertTriangle className="h-3 w-3 mr-1" />
                          )}
                          {device.status}
                        </div>
                      </Badge>
                      {device.battery !== null && (
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Battery 
                            className={`h-4 w-4 ${
                              device.battery > 50 
                                ? "text-green-600" 
                                : device.battery > 20 
                                  ? "text-yellow-600" 
                                  : "text-red-600"
                            }`} 
                          />
                          <span>{device.battery}%</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Repositório:
                        </span>
                        <span className="font-medium">{device.repository}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Localização:
                        </span>
                        <span className="font-medium">{device.location}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Valor Atual:
                        </span>
                        <span className="font-medium text-primary">
                          {device.value}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                      <div className="flex items-center space-x-1">
                        <Activity className="h-3 w-3" />
                        <span>Última atividade: {device.lastSeen}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="bg-card rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Nome / Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Repositório</TableHead>
                  <TableHead>Valor atual</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Última atividade</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devices.map((device) => {
                  const DeviceIcon = getDeviceIcon(device.type);
                  return (
                    <TableRow key={device.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <DeviceIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{device.name}</p>
                            <p className="text-xs text-muted-foreground">{device.type}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2 items-center">
                          <Badge
                            className={
                              statusColors[device.status as keyof typeof statusColors]
                            }
                          >
                            <div className="flex items-center space-x-1">
                              {device.status === "Online" ? (
                                <Wifi className="h-3 w-3 mr-1" />
                              ) : device.status === "Offline" ? (
                                <WifiOff className="h-3 w-3 mr-1" />
                              ) : (
                                <AlertTriangle className="h-3 w-3 mr-1" />
                              )}
                              {device.status}
                            </div>
                          </Badge>
                          {device.battery !== null && (
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Battery 
                                className={`h-4 w-4 ${
                                  device.battery > 50 
                                    ? "text-green-600" 
                                    : device.battery > 20 
                                      ? "text-yellow-600" 
                                      : "text-red-600"
                                }`} 
                              />
                              <span>{device.battery}%</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{device.repository}</TableCell>
                      <TableCell className="font-medium text-primary">{device.value}</TableCell>
                      <TableCell>{device.location}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Activity className="h-3 w-3" />
                          <span>{device.lastSeen}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Atualizar Firmware</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Remover</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </Layout>
  );
}
