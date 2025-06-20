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
          <Label htmlFor="attenuation">Atenuaç��o (dB)</Label>
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
  // Generate some sample data for the chart
  const generateSampleData = () => {
    const data = [];
    const now = Date.now();
    for (let i = 0; i < 50; i++) {
      data.push({
        time: new Date(now - (50 - i) * 1000),
        value: Math.random() * 100 + Math.sin(i * 0.1) * 20 + 50,
      });
    }
    return data;
  };

  const chartData = generateSampleData();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{control.name}</h3>
          <p className="text-sm text-muted-foreground">
            Monitoramento em tempo real - Pin: {control.pinName}
          </p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Fechar
        </Button>
      </div>

      <div className="h-64 border rounded-lg bg-muted/20 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Gráfico em tempo real do {control.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Valor atual: {control.currentValue} | Período: {control.period}ms
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Máximo</p>
          <p className="text-lg font-bold text-green-600">95.2</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Mínimo</p>
          <p className="text-lg font-bold text-blue-600">12.8</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Média</p>
          <p className="text-lg font-bold text-primary">52.7</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Desvio</p>
          <p className="text-lg font-bold text-orange-600">±8.3</p>
        </div>
      </div>
    </div>
  );
}
