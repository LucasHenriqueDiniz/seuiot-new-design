import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Cpu,
  Wifi,
  WifiOff,
  MoreHorizontal,
  Eye,
  Settings,
  Trash2,
  Activity,
  Thermometer,
  Zap,
  Gauge,
} from "lucide-react";

const devices = [
  {
    id: 1,
    name: "Sensor-Temp-001",
    type: "Sensor de Temperatura",
    repository: "EXEMPLO 1",
    status: "Online",
    battery: 85,
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
    battery: 12,
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

export default function Devices() {
  return (
    <Layout title="Dispositivos">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dispositivos</h1>
            <p className="text-muted-foreground">
              Monitore e gerencie todos os seus dispositivos IoT conectados
            </p>
          </div>
          <Button className="w-fit">
            <Plus className="h-4 w-4 mr-2" />
            Conectar Dispositivo
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar dispositivos..." className="pl-10" />
          </div>
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

        {/* Device Cards */}
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
                        <CardTitle className="text-base">
                          {device.name}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {device.type}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4 mr-2" />
                          Configurar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remover
                        </DropdownMenuItem>
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
                          <Wifi className="h-3 w-3" />
                        ) : (
                          <WifiOff className="h-3 w-3" />
                        )}
                        <span>{device.status}</span>
                      </div>
                    </Badge>
                    {device.battery !== null && (
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <span>🔋</span>
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

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Monitorar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="h-4 w-4 mr-2" />
                      Config
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Cpu className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-xl font-bold">6</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Wifi className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Online</p>
                  <p className="text-xl font-bold">4</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <WifiOff className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Offline</p>
                  <p className="text-xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Manutenção</p>
                  <p className="text-xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
