import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  Wifi,
  WifiOff,
  Activity,
  RefreshCw,
  Settings,
  BarChart3,
} from "lucide-react";

interface DeviceDetailProps {
  selectedRepository: string | null;
  selectedDevice: string | null;
  onSelectRepository: (repoId: string | null) => void;
  onSelectDevice: (deviceId: string | null) => void;
}

// Mock device data
const deviceData = {
  "sensor-temp-001": {
    name: "Sensor-Temp-001",
    type: "Sensor de Temperatura",
    repository: "EXEMPLO 1",
    status: "Online",
    value: "23.5°C",
    location: "Linha de Produção A",
    lastSeen: "há 30s",
    battery: 85,
  },
  "smart-thermostat": {
    name: "Smart-Thermostat",
    type: "Termostato Inteligente",
    repository: "Smart Home Beta",
    status: "Online",
    value: "22.0°C",
    location: "Sala Principal",
    lastSeen: "há 15s",
    battery: null,
  },
};

export default function DeviceDetail({
  selectedRepository,
  selectedDevice,
  onSelectRepository,
  onSelectDevice,
}: DeviceDetailProps) {
  const { id } = useParams();

  const device =
    deviceData[id as keyof typeof deviceData] || deviceData["sensor-temp-001"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Offline":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Layout
      title={device.name}
      selectedRepository={selectedRepository}
      selectedDevice={selectedDevice}
      onSelectRepository={onSelectRepository}
      onSelectDevice={onSelectDevice}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {device.name}
              </h1>
              <p className="text-muted-foreground">
                {device.type} • {device.repository}
              </p>
            </div>
            <Badge className={getStatusColor(device.status)}>
              <div className="flex items-center space-x-1">
                {device.status === "Online" ? (
                  <Wifi className="h-3 w-3" />
                ) : (
                  <WifiOff className="h-3 w-3" />
                )}
                <span>{device.status}</span>
              </div>
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sincronizar
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configurar
            </Button>
          </div>
        </div>

        {/* Device Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status do Dispositivo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className={getStatusColor(device.status)}>
                  {device.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Localização:</span>
                <span className="font-medium">{device.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Última atividade:</span>
                <span className="font-medium">{device.lastSeen}</span>
              </div>
              {device.battery !== null && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bateria:</span>
                  <span className="font-medium">{device.battery}%</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Valor Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {device.value}
                </div>
                <p className="text-sm text-muted-foreground">
                  Última leitura: {device.lastSeen}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Ver Gráficos
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                Histórico
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">Dispositivo conectado</span>
                </div>
                <span className="text-xs text-muted-foreground">há 2 min</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm">
                    Leitura de temperatura: 23.5°C
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">há 5 min</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Configuração atualizada</span>
                </div>
                <span className="text-xs text-muted-foreground">há 1h</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Monitoramento em Tempo Real</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 border rounded-lg bg-muted/20 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Gráfico de monitoramento em tempo real do {device.name}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
