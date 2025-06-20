import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Database,
  Cpu,
  Activity,
  BarChart3,
  Settings,
  Play,
  Pause,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

// Mock data - in real app this would come from API
const repositoryData = {
  example1: {
    name: "EXEMPLO 1",
    description: "Sistema de monitoramento industrial para linha de produção A",
    status: "Ativo",
    devices: [
      { id: 1, name: "Sensor-Temp-001", status: "Online", value: "23.5°C" },
      { id: 2, name: "Pump-Control-A1", status: "Online", value: "Ativo" },
      { id: 3, name: "Pressure-Sensor-01", status: "Online", value: "2.1 bar" },
    ],
  },
};

const mockOperations = [
  {
    id: 1,
    name: "Monitoramento Contínuo",
    status: "Executando",
    devices: 3,
    progress: 85,
  },
  {
    id: 2,
    name: "Coleta de Dados",
    status: "Pausado",
    devices: 2,
    progress: 45,
  },
  {
    id: 3,
    name: "Análise Preditiva",
    status: "Agendado",
    devices: 1,
    progress: 0,
  },
];

export default function RepositoryDetail() {
  const { id } = useParams();
  const [selectedDevice, setSelectedDevice] = useState("all");

  const repository = repositoryData.example1; // In real app, fetch by id

  return (
    <Layout title={repository.name}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {repository.name}
              </h1>
              <p className="text-muted-foreground">{repository.description}</p>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              {repository.status}
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Select value={selectedDevice} onValueChange={setSelectedDevice}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Selecionar dispositivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os dispositivos</SelectItem>
                {repository.devices.map((device) => (
                  <SelectItem key={device.id} value={device.id.toString()}>
                    {device.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sincronizar
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="operations" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="operations"
              className="flex items-center space-x-2"
            >
              <Activity className="h-4 w-4" />
              <span>Operações</span>
            </TabsTrigger>
            <TabsTrigger
              value="control"
              className="flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span>Controle</span>
            </TabsTrigger>
            <TabsTrigger value="charts" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Gráficos</span>
            </TabsTrigger>
            <TabsTrigger
              value="instrumentation"
              className="flex items-center space-x-2"
            >
              <Cpu className="h-4 w-4" />
              <span>Instrumentação</span>
            </TabsTrigger>
          </TabsList>

          {/* Operations Tab */}
          <TabsContent value="operations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Operações Ativas
                      </p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Dispositivos
                      </p>
                      <p className="text-2xl font-bold">
                        {repository.devices.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Taxa de Sucesso
                      </p>
                      <p className="text-2xl font-bold">94.2%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Operações em Execução</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOperations.map((operation) => (
                    <div
                      key={operation.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Activity className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{operation.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {operation.devices} dispositivos envolvidos
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge
                            variant={
                              operation.status === "Executando"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {operation.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {operation.progress}% completo
                          </p>
                        </div>

                        <div className="flex space-x-1">
                          {operation.status === "Executando" ? (
                            <Button variant="outline" size="sm">
                              <Pause className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Control Tab */}
          <TabsContent value="control" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Controles Remotos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Bomba Principal</span>
                    <Button size="sm">Ligar</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sistema de Ventilação</span>
                    <Button variant="outline" size="sm">
                      Desligar
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Alarme de Temperatura</span>
                    <Button variant="destructive" size="sm">
                      Ativo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configurações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Intervalo de Coleta (min)
                    </label>
                    <Select defaultValue="5">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 minuto</SelectItem>
                        <SelectItem value="5">5 minutos</SelectItem>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="30">30 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Charts Tab */}
          <TabsContent value="charts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gráfico de Temperatura (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground">
                    Gráfico de temperatura seria renderizado aqui
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Umidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Gráfico de umidade</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pressão</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Gráfico de pressão</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Instrumentation Tab */}
          <TabsContent value="instrumentation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {repository.devices.map((device) => (
                <Card key={device.id}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center space-x-2">
                      <Cpu className="h-4 w-4" />
                      <span>{device.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Status:
                        </span>
                        <Badge
                          variant={
                            device.status === "Online"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {device.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Valor:
                        </span>
                        <span className="font-medium">{device.value}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Última leitura:
                        </span>
                        <span className="text-sm">há 30s</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <span>Alertas e Notificações</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <span className="text-sm">
                      Sensor de temperatura próximo ao limite máximo
                    </span>
                    <Badge variant="outline">Atenção</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <span className="text-sm">
                      Manutenção programada para amanhã às 14h
                    </span>
                    <Badge variant="outline">Info</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
