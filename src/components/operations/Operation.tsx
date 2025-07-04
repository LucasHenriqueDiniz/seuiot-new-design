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
  MoreHorizontal,
  BarChart3,
  Activity,
  Play,
  Pause,
  Settings,
} from "lucide-react";

export interface OperationConfig {
  id: string;
  name: string;
  pinNumber: number;
  bitWidth: number;
  attenuation: number;
  sampleCount: number;
  period: number;
  type: "analog" | "digital" | "pwm";
  description?: string;
}

interface OperationProps {
  operation: OperationConfig;
  onEdit: (operation: OperationConfig) => void;
  onDelete: (id: string) => void;
  onViewChart: (operation: OperationConfig) => void;
  onClick?: (operation: OperationConfig) => void;
}

export function Operation({
  operation,
  onEdit,
  onDelete,
  onViewChart,
  onClick,
}: OperationProps) {
  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick?.(operation)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{operation.name}</CardTitle>
              <p className="text-xs text-muted-foreground">
                Pin: {operation.pinNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(operation);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewChart(operation);
                  }}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Ver Gráfico
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(operation.id);
                  }}
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
        {operation.description && (
          <p className="text-sm text-muted-foreground">
            {operation.description}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Largura:</span>
            <span className="ml-2 font-medium">{operation.bitWidth} bits</span>
          </div>
          <div>
            <span className="text-muted-foreground">Atenuação:</span>
            <span className="ml-2 font-medium">{operation.attenuation} dB</span>
          </div>
          <div>
            <span className="text-muted-foreground">Amostras:</span>
            <span className="ml-2 font-medium">{operation.sampleCount}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Período:</span>
            <span className="ml-2 font-medium">{operation.period} ms</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface OperationFormProps {
  operation?: OperationConfig;
  onSave: (operation: OperationConfig) => void;
  onCancel: () => void;
}

export function OperationForm({
  operation,
  onSave,
  onCancel,
}: OperationFormProps) {
  const [formData, setFormData] = useState<OperationConfig>(
    operation || {
      id: "",
      name: "",
      pinNumber: 0,
      bitWidth: 12,
      attenuation: 0,
      sampleCount: 64,
      period: 1000,
      type: "analog",
      description: "",
    },
  );

  const handleSave = () => {
    if (!formData.id) {
      formData.id = `operation_${Date.now()}`;
    }
    onSave(formData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome da Operação</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Joystick Y"
          />
        </div>
        <div>
          <Label htmlFor="pinNumber">Número do Pino</Label>
          <Input
            id="pinNumber"
            type="number"
            value={formData.pinNumber}
            onChange={(e) =>
              setFormData({
                ...formData,
                pinNumber: parseInt(e.target.value) || 0,
              })
            }
            placeholder="Ex: 33"
            min="0"
            max="39"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          value={formData.description || ""}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Descrição opcional da operação"
        />
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
        <Label htmlFor="type">Tipo de Operação</Label>
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
          {operation ? "Atualizar" : "Criar"} Operação
        </Button>
      </div>
    </div>
  );
}
