import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  Trash2,
  Plus,
  MoreHorizontal,
  BarChart3,
  Settings,
  Play,
  Pause,
} from "lucide-react";

export interface ControlConfig {
  id: string;
  name: string;
  pinName: string;
  bitWidth: number;
  attenuation: number;
  sampleCount: number;
  period: number;
  currentValue: number;
  type: "analog" | "digital" | "pwm";
  status: "active" | "inactive" | "error";
}

interface ControlProps {
  control: ControlConfig;
  onEdit: (control: ControlConfig) => void;
  onDelete: (id: string) => void;
  onViewChart: (control: ControlConfig) => void;
}

export function Control({
  control,
  onEdit,
  onDelete,
  onViewChart,
}: ControlProps) {
  const [isRunning, setIsRunning] = useState(control.status === "active");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const toggleControl = () => {
    setIsRunning(!isRunning);
    // Here you would send the command to the device
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{control.name}</CardTitle>
              <p className="text-xs text-muted-foreground">
                Pin: {control.pinName}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(control.status)}>
              {control.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(control)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewChart(control)}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Ver Gráfico
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(control.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Largura:</span>
            <span className="ml-2 font-medium">{control.bitWidth} bits</span>
          </div>
          <div>
            <span className="text-muted-foreground">Atenuação:</span>
            <span className="ml-2 font-medium">{control.attenuation} dB</span>
          </div>
          <div>
            <span className="text-muted-foreground">Amostras:</span>
            <span className="ml-2 font-medium">{control.sampleCount}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Período:</span>
            <span className="ml-2 font-medium">{control.period} ms</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">
                Valor Atual:
              </span>
              <span className="ml-2 text-lg font-bold text-primary">
                {control.currentValue}
              </span>
            </div>
            <Button
              variant={isRunning ? "destructive" : "default"}
              size="sm"
              onClick={toggleControl}
            >
              {isRunning ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Parar
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Iniciar
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ControlFormProps {
  control?: ControlConfig;
  onSave: (control: ControlConfig) => void;
  onCancel: () => void;
}

export function ControlForm({ control, onSave, onCancel }: ControlFormProps) {
  const [formData, setFormData] = useState<ControlConfig>(
    control || {
      id: "",
      name: "",
      pinName: "",
      bitWidth: 12,
      attenuation: 0,
      sampleCount: 64,
      period: 1000,
      currentValue: 0,
      type: "analog",
      status: "inactive",
    },
  );

  const handleSave = () => {
    if (!formData.id) {
      formData.id = `control_${Date.now()}`;
    }
    onSave(formData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome do Controle</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Joystick Y"
          />
        </div>
        <div>
          <Label htmlFor="pinName">Nome do Pino</Label>
          <Input
            id="pinName"
            value={formData.pinName}
            onChange={(e) =>
              setFormData({ ...formData, pinName: e.target.value })
            }
            placeholder="Ex: GPIO_33"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bitWidth">Largura em bits</Label>
          <Select
            value={formData.bitWidth.toString()}
            onValueChange={(value) =>
              setFormData({ ...formData, bitWidth: parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8 bits</SelectItem>
              <SelectItem value="10">10 bits</SelectItem>
              <SelectItem value="12">12 bits</SelectItem>
              <SelectItem value="16">16 bits</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="attenuation">Atenuação (dB)</Label>
          <Select
            value={formData.attenuation.toString()}
            onValueChange={(value) =>
              setFormData({ ...formData, attenuation: parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0 dB</SelectItem>
              <SelectItem value="3">3 dB</SelectItem>
              <SelectItem value="6">6 dB</SelectItem>
              <SelectItem value="11">11 dB</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sampleCount">Número de amostras</Label>
          <Input
            id="sampleCount"
            type="number"
            value={formData.sampleCount}
            onChange={(e) =>
              setFormData({
                ...formData,
                sampleCount: parseInt(e.target.value),
              })
            }
            min="1"
            max="1024"
          />
        </div>
        <div>
          <Label htmlFor="period">Período (ms)</Label>
          <Input
            id="period"
            type="number"
            value={formData.period}
            onChange={(e) =>
              setFormData({ ...formData, period: parseInt(e.target.value) })
            }
            min="100"
            max="60000"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="type">Tipo de Controle</Label>
        <Select
          value={formData.type}
          onValueChange={(value: any) =>
            setFormData({ ...formData, type: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="analog">Analógico</SelectItem>
            <SelectItem value="digital">Digital</SelectItem>
            <SelectItem value="pwm">PWM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>
          {control ? "Atualizar" : "Criar"} Controle
        </Button>
      </div>
    </div>
  );
}

interface ControlChartProps {
  control: ControlConfig;
  onClose: () => void;
}

export function ControlChart({ control, onClose }: ControlChartProps) {
  // Generate realistic sample data based on control type
  const generateSampleData = () => {
    const data = [];
    const now = Date.now();
    for (let i = 0; i < 50; i++) {
      let value;
      const time = now - (50 - i) * control.period;

      if (control.name.toLowerCase().includes("joystick")) {
        // Joystick data: more varied, centered around middle value
        value = 50 + Math.sin(i * 0.3) * 30 + (Math.random() - 0.5) * 10;
      } else if (control.name.toLowerCase().includes("temperatura")) {
        // Temperature: slower changes, more stable
        value = 65 + Math.sin(i * 0.1) * 15 + (Math.random() - 0.5) * 5;
      } else if (control.name.toLowerCase().includes("bomba")) {
        // Pump: step changes, more digital-like
        value = Math.random() > 0.7 ? 100 : 20 + (Math.random() - 0.5) * 10;
      } else {
        // Default pattern
        value = Math.random() * 100 + Math.sin(i * 0.2) * 20 + 40;
      }

      data.push({
        time: new Date(time),
        value: Math.max(0, Math.min(100, value)),
      });
    }
    return data;
  };

  const chartData = generateSampleData();
  const maxValue = Math.max(...chartData.map((d) => d.value));
  const minValue = Math.min(...chartData.map((d) => d.value));
  const avgValue =
    chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length;
  const stdDev = Math.sqrt(
    chartData.reduce((sum, d) => sum + Math.pow(d.value - avgValue, 2), 0) /
      chartData.length,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{control.name}</h3>
          <p className="text-sm text-muted-foreground">
            Monitoramento em tempo real - Pin: {control.pinName} |{" "}
            {control.bitWidth} bits | {control.attenuation}dB
          </p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Fechar
        </Button>
      </div>

      {/* Simple ASCII-style chart visualization */}
      <div className="h-64 border rounded-lg bg-background p-4 font-mono text-xs">
        <div className="h-full relative">
          <div className="absolute inset-0 grid grid-rows-10 opacity-20">
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                className="border-b border-muted-foreground/20"
              ></div>
            ))}
          </div>

          <div className="absolute inset-0 flex items-end justify-between">
            {chartData.slice(-20).map((point, i) => {
              const height = `${point.value}%`;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center space-y-1 flex-1"
                >
                  <div
                    className="bg-primary rounded-t-sm min-w-[2px] transition-all duration-200 hover:bg-primary/80"
                    style={{ height }}
                    title={`Valor: ${point.value.toFixed(1)} em ${point.time.toLocaleTimeString()}`}
                  ></div>
                </div>
              );
            })}
          </div>

          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-muted-foreground">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Máximo</p>
          <p className="text-lg font-bold text-green-600">
            {maxValue.toFixed(1)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Mínimo</p>
          <p className="text-lg font-bold text-blue-600">
            {minValue.toFixed(1)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Média</p>
          <p className="text-lg font-bold text-primary">
            {avgValue.toFixed(1)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Desvio</p>
          <p className="text-lg font-bold text-orange-600">
            ±{stdDev.toFixed(1)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm bg-muted/50 rounded-lg p-3">
        <div className="flex items-center space-x-4">
          <span className="text-muted-foreground">Taxa de amostragem:</span>
          <span className="font-medium">
            {control.sampleCount} amostras/{control.period}ms
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-muted-foreground">Status:</span>
          <Badge
            variant={control.status === "active" ? "default" : "secondary"}
            className="capitalize"
          >
            {control.status}
          </Badge>
        </div>
      </div>
    </div>
  );
}
