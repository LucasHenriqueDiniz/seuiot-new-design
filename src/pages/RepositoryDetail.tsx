import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Plus,
} from "lucide-react";
import {
  Control,
  ControlForm,
  ControlChart,
  ControlConfig,
} from "@/components/controls/Control";

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

const initialControls: ControlConfig[] = [
  {
    id: "joystick_y_001",
    name: "Joystick Y",
    pinName: "GPIO_33",
    bitWidth: 12,
    attenuation: 0,
    sampleCount: 64,
    period: 1000,
    currentValue: 33,
    type: "analog",
    status: "active",
  },
  {
    id: "temp_control_002",
    name: "Controle de Temperatura",
    pinName: "GPIO_25",
    bitWidth: 12,
    attenuation: 3,
    sampleCount: 128,
    period: 2000,
    currentValue: 67,
    type: "analog",
    status: "active",
  },
  {
    id: "pump_speed_003",
    name: "Velocidade da Bomba",
    pinName: "GPIO_18",
    bitWidth: 8,
    attenuation: 0,
    sampleCount: 32,
    period: 500,
    currentValue: 85,
    type: "pwm",
    status: "inactive",
  },
];

export default function RepositoryDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [selectedDevice, setSelectedDevice] = useState(
    searchParams.get("device") || "all",
  );
  const [controls, setControls] = useState<ControlConfig[]>(initialControls);
  const [showControlForm, setShowControlForm] = useState(false);
  const [showControlChart, setShowControlChart] = useState(false);
  const [editingControl, setEditingControl] = useState<ControlConfig | null>(
    null,
  );
  const [chartControl, setChartControl] = useState<ControlConfig | null>(null);

  const repository = repositoryData.example1; // In real app, fetch by id

  const handleSaveControl = (control: ControlConfig) => {
    if (editingControl) {
      setControls(controls.map((c) => (c.id === control.id ? control : c)));
    } else {
      setControls([...controls, control]);
    }
    setShowControlForm(false);
    setEditingControl(null);
  };

  const handleEditControl = (control: ControlConfig) => {
    setEditingControl(control);
    setShowControlForm(true);
  };

  const handleDeleteControl = (id: string) => {
    setControls(controls.filter((c) => c.id !== id));
  };

  const handleViewChart = (control: ControlConfig) => {
    setChartControl(control);
    setShowControlChart(true);
  };

  const closeControlForm = () => {
    setShowControlForm(false);
    setEditingControl(null);
  };

  const closeControlChart = () => {
    setShowControlChart(false);
    setChartControl(null);
  };

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
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Controles de Dispositivo
                </h3>
                <p className="text-sm text-muted-foreground">
                  Configure e monitore os controles analógicos e digitais
                </p>
              </div>
              <Button onClick={() => setShowControlForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Controle
              </Button>
            </div>

            {controls.length === 0 ? (
              <Card>
                <CardContent className="py-8">
                  <div className="text-center">
                    <Settings className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">
                      Nenhum controle configurado
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Crie seu primeiro controle para começar a monitorar
                      dispositivos
                    </p>
                    <Button onClick={() => setShowControlForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Primeiro Controle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {controls.map((control) => (
                  <Control
                    key={control.id}
                    control={control}
                    onEdit={handleEditControl}
                    onDelete={handleDeleteControl}
                    onViewChart={handleViewChart}
                  />
                ))}
              </div>
            )}

            {/* Control Form Dialog */}
            <Dialog open={showControlForm} onOpenChange={setShowControlForm}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingControl ? "Editar Controle" : "Novo Controle"}
                  </DialogTitle>
                </DialogHeader>
                <ControlForm
                  control={editingControl}
                  onSave={handleSaveControl}
                  onCancel={closeControlForm}
                />
              </DialogContent>
            </Dialog>

            {/* Control Chart Dialog */}
            <Dialog open={showControlChart} onOpenChange={setShowControlChart}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Monitoramento de Controle</DialogTitle>
                </DialogHeader>
                {chartControl && (
                  <ControlChart
                    control={chartControl}
                    onClose={closeControlChart}
                  />
                )}
              </DialogContent>
            </Dialog>
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
