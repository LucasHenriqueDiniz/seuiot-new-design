import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Database,
  Activity,
  BarChart3,
  Settings,
  Plus,
  RefreshCw,
} from "lucide-react";
import {
  Operation,
  OperationForm,
  OperationConfig,
} from "@/components/operations/Operation";
import {
  ControlNew,
  ControlNewForm,
  ControlNewConfig,
} from "@/components/controls/ControlNew";
import {
  Instrumentation,
  InstrumentationForm,
  InstrumentationConfig,
} from "@/components/instrumentation/Instrumentation";
import { ControlChart } from "@/components/controls/Control";
import { GraphsTab } from "@/components/graphs/GraphsTab";

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

const initialOperations: OperationConfig[] = [
  {
    id: "joystick_y_001",
    name: "Joystick Y",
    pinNumber: 33,
    bitWidth: 12,
    attenuation: 0,
    sampleCount: 64,
    period: 1000,
    type: "analog",
    description: "Controle de entrada analógica para joystick Y",
  },
  {
    id: "temp_sensor_002",
    name: "Sensor de Temperatura",
    pinNumber: 25,
    bitWidth: 12,
    attenuation: 3,
    sampleCount: 128,
    period: 2000,
    type: "analog",
    description: "Sensor de temperatura ambiente",
  },
];

const initialControls: ControlNewConfig[] = [
  {
    id: "temp_control_001",
    name: "Controle de Temperatura",
    type: "actuator",
    controlType: "pid",
    operationMode: "continuous",
    referenceValue: 25.0,
    saveToFlash: true,
    pidKp: 1.0,
    pidKi: 0.1,
    pidKd: 0.01,
  },
  {
    id: "flow_sensor_002",
    name: "Sensor de Fluxo",
    type: "sensor",
    controlType: "raw",
    operationMode: "continuous",
    referenceValue: 0,
    saveToFlash: false,
  },
];

const initialInstrumentations: InstrumentationConfig[] = [
  {
    id: "temp_monitor_001",
    name: "Monitor de Temperatura",
    sensorOperation: "temp_sensor_002",
    useRawData: true,
    type: "linear",
    comparatorType: "range",
    rangeMin: 20,
    rangeMax: 30,
    linearScale: 1.0,
    linearOffset: 0,
  },
];

interface RepositoryDetailProps {
  selectedRepository: string | null;
  selectedDevice: string | null;
  onSelectRepository: (repoId: string | null) => void;
  onSelectDevice: (deviceId: string | null) => void;
}

export default function RepositoryDetail({
  selectedRepository,
  selectedDevice,
  onSelectRepository,
  onSelectDevice,
}: RepositoryDetailProps) {
  const { id } = useParams();

  // Operations state
  const [operations, setOperations] =
    useState<OperationConfig[]>(initialOperations);
  const [showOperationForm, setShowOperationForm] = useState(false);
  const [editingOperation, setEditingOperation] =
    useState<OperationConfig | null>(null);

  // Controls state
  const [controls, setControls] = useState<ControlNewConfig[]>(initialControls);
  const [showControlForm, setShowControlForm] = useState(false);
  const [editingControl, setEditingControl] = useState<ControlNewConfig | null>(
    null,
  );

  // Instrumentations state
  const [instrumentations, setInstrumentations] = useState<
    InstrumentationConfig[]
  >(initialInstrumentations);
  const [showInstrumentationForm, setShowInstrumentationForm] = useState(false);
  const [editingInstrumentation, setEditingInstrumentation] =
    useState<InstrumentationConfig | null>(null);

  // Chart state
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState<any>(null);

  const repository = repositoryData.example1; // In real app, fetch by id

  // Operations handlers
  const handleSaveOperation = (operation: OperationConfig) => {
    if (editingOperation) {
      setOperations(
        operations.map((o) => (o.id === operation.id ? operation : o)),
      );
    } else {
      setOperations([...operations, operation]);
    }
    setShowOperationForm(false);
    setEditingOperation(null);
  };

  const handleEditOperation = (operation: OperationConfig) => {
    setEditingOperation(operation);
    setShowOperationForm(true);
  };

  const handleDeleteOperation = (id: string) => {
    setOperations(operations.filter((o) => o.id !== id));
  };

  const handleViewOperationChart = (operation: OperationConfig) => {
    setChartData(operation);
    setShowChart(true);
  };

  // Controls handlers
  const handleSaveControl = (control: ControlNewConfig) => {
    if (editingControl) {
      setControls(controls.map((c) => (c.id === control.id ? control : c)));
    } else {
      setControls([...controls, control]);
    }
    setShowControlForm(false);
    setEditingControl(null);
  };

  const handleEditControl = (control: ControlNewConfig) => {
    setEditingControl(control);
    setShowControlForm(true);
  };

  const handleDeleteControl = (id: string) => {
    setControls(controls.filter((c) => c.id !== id));
  };

  // Instrumentations handlers
  const handleSaveInstrumentation = (
    instrumentation: InstrumentationConfig,
  ) => {
    if (editingInstrumentation) {
      setInstrumentations(
        instrumentations.map((i) =>
          i.id === instrumentation.id ? instrumentation : i,
        ),
      );
    } else {
      setInstrumentations([...instrumentations, instrumentation]);
    }
    setShowInstrumentationForm(false);
    setEditingInstrumentation(null);
  };

  const handleEditInstrumentation = (
    instrumentation: InstrumentationConfig,
  ) => {
    setEditingInstrumentation(instrumentation);
    setShowInstrumentationForm(true);
  };

  const handleDeleteInstrumentation = (id: string) => {
    setInstrumentations(instrumentations.filter((i) => i.id !== id));
  };

  const handleViewInstrumentationChart = (
    instrumentation: InstrumentationConfig,
  ) => {
    setChartData(instrumentation);
    setShowChart(true);
  };

  return (
    <Layout
      title={repository.name}
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
              <BarChart3 className="h-4 w-4" />
              <span>Instrumentação</span>
            </TabsTrigger>
          </TabsList>

          {/* Operations Tab */}
          <TabsContent value="operations" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Operações</h3>
                <p className="text-sm text-muted-foreground">
                  Configure e monitore operações como Joystick Y, sensores e
                  controles
                </p>
              </div>
              <Button onClick={() => setShowOperationForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Operação
              </Button>
            </div>

            {operations.length === 0 ? (
              <Card>
                <CardContent className="py-8">
                  <div className="text-center">
                    <Activity className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">
                      Nenhuma operação configurada
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Crie sua primeira operação para começar a monitorar
                      dispositivos
                    </p>
                    <Button onClick={() => setShowOperationForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Primeira Operação
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {operations.map((operation) => (
                  <Operation
                    key={operation.id}
                    operation={operation}
                    onEdit={handleEditOperation}
                    onDelete={handleDeleteOperation}
                    onViewChart={handleViewOperationChart}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Control Tab */}
          <TabsContent value="control" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Controles</h3>
                <p className="text-sm text-muted-foreground">
                  Sensores e Atuadores com controle Bruto, Operação ou PID
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
                      Crie controles para sensores e atuadores com diferentes
                      tipos
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
                  <ControlNew
                    key={control.id}
                    control={control}
                    onEdit={handleEditControl}
                    onDelete={handleDeleteControl}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Charts Tab */}
          <TabsContent value="charts" className="space-y-6">
            <GraphsTab
              operations={operations}
              instrumentations={instrumentations}
            />
          </TabsContent>

          {/* Instrumentation Tab */}
          <TabsContent value="instrumentation" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Instrumentação</h3>
                <p className="text-sm text-muted-foreground">
                  Configure instrumentações com operações de sensor, referências
                  e comparadores
                </p>
              </div>
              <Button onClick={() => setShowInstrumentationForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Instrumentação
              </Button>
            </div>

            {instrumentations.length === 0 ? (
              <Card>
                <CardContent className="py-8">
                  <div className="text-center">
                    <BarChart3 className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">
                      Nenhuma instrumentação configurada
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Crie instrumentações para monitoramento e análise de dados
                    </p>
                    <Button onClick={() => setShowInstrumentationForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Primeira Instrumentação
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {instrumentations.map((instrumentation) => (
                  <Instrumentation
                    key={instrumentation.id}
                    instrumentation={instrumentation}
                    onEdit={handleEditInstrumentation}
                    onDelete={handleDeleteInstrumentation}
                    onViewChart={handleViewInstrumentationChart}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Operation Form Dialog */}
        <Dialog open={showOperationForm} onOpenChange={setShowOperationForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingOperation ? "Editar Operação" : "Nova Operação"}
              </DialogTitle>
            </DialogHeader>
            <OperationForm
              operation={editingOperation}
              onSave={handleSaveOperation}
              onCancel={() => {
                setShowOperationForm(false);
                setEditingOperation(null);
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Control Form Dialog */}
        <Dialog open={showControlForm} onOpenChange={setShowControlForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingControl ? "Editar Controle" : "Novo Controle"}
              </DialogTitle>
            </DialogHeader>
            <ControlNewForm
              control={editingControl}
              onSave={handleSaveControl}
              onCancel={() => {
                setShowControlForm(false);
                setEditingControl(null);
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Instrumentation Form Dialog */}
        <Dialog
          open={showInstrumentationForm}
          onOpenChange={setShowInstrumentationForm}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingInstrumentation
                  ? "Editar Instrumentação"
                  : "Nova Instrumentação"}
              </DialogTitle>
            </DialogHeader>
            <InstrumentationForm
              instrumentation={editingInstrumentation}
              onSave={handleSaveInstrumentation}
              onCancel={() => {
                setShowInstrumentationForm(false);
                setEditingInstrumentation(null);
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Chart Dialog */}
        <Dialog open={showChart} onOpenChange={setShowChart}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Monitoramento</DialogTitle>
            </DialogHeader>
            {chartData && (
              <ControlChart
                control={chartData}
                onClose={() => setShowChart(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
