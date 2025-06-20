import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Settings,
  Thermometer,
  Zap,
} from "lucide-react";

export interface ControlNewConfig {
  id: string;
  name: string;
  type: "sensor" | "actuator";
  controlType: "raw" | "operation" | "pid";
  operationMode: string;
  referenceValue: number;
  saveToFlash: boolean;
  // PID specific fields
  pidKp?: number;
  pidKi?: number;
  pidKd?: number;
  // Operation specific fields
  operationId?: string;
}

interface ControlNewProps {
  control: ControlNewConfig;
  onEdit: (control: ControlNewConfig) => void;
  onDelete: (id: string) => void;
}

export function ControlNew({ control, onEdit, onDelete }: ControlNewProps) {
  const getControlTypeIcon = () => {
    return control.type === "sensor" ? Thermometer : Zap;
  };

  const ControlIcon = getControlTypeIcon();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                control.type === "sensor"
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "bg-orange-100 dark:bg-orange-900"
              }`}
            >
              <ControlIcon
                className={`h-5 w-5 ${
                  control.type === "sensor"
                    ? "text-blue-600"
                    : "text-orange-600"
                }`}
              />
            </div>
            <div>
              <CardTitle className="text-base">{control.name}</CardTitle>
              <p className="text-xs text-muted-foreground capitalize">
                {control.type} • {control.controlType}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
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
            <span className="text-muted-foreground">Modo:</span>
            <span className="ml-2 font-medium">{control.operationMode}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Referência:</span>
            <span className="ml-2 font-medium">{control.referenceValue}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Flash:</span>
            <span className="ml-2 font-medium">
              {control.saveToFlash ? "Sim" : "Não"}
            </span>
          </div>
        </div>

        {control.controlType === "pid" && (
          <div className="border-t pt-3">
            <p className="text-xs text-muted-foreground mb-2">
              Parâmetros PID:
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Kp:</span>
                <span className="ml-1 font-medium">{control.pidKp || 0}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Ki:</span>
                <span className="ml-1 font-medium">{control.pidKi || 0}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Kd:</span>
                <span className="ml-1 font-medium">{control.pidKd || 0}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface ControlNewFormProps {
  control?: ControlNewConfig;
  onSave: (control: ControlNewConfig) => void;
  onCancel: () => void;
}

export function ControlNewForm({
  control,
  onSave,
  onCancel,
}: ControlNewFormProps) {
  const [formData, setFormData] = useState<ControlNewConfig>(
    control || {
      id: "",
      name: "",
      type: "sensor",
      controlType: "raw",
      operationMode: "continuous",
      referenceValue: 0,
      saveToFlash: false,
      pidKp: 1.0,
      pidKi: 0.1,
      pidKd: 0.01,
    },
  );

  const handleSave = () => {
    if (!formData.id) {
      formData.id = `control_new_${Date.now()}`;
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
            placeholder="Ex: Controle de Temperatura"
          />
        </div>
        <div>
          <Label htmlFor="type">Tipo</Label>
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
              <SelectItem value="sensor">Sensor</SelectItem>
              <SelectItem value="actuator">Atuador</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="controlType">Tipo de Controle</Label>
          <Select
            value={formData.controlType}
            onValueChange={(value: any) =>
              setFormData({ ...formData, controlType: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="raw">Bruto</SelectItem>
              <SelectItem value="operation">Operação</SelectItem>
              <SelectItem value="pid">PID</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="operationMode">Modo de Operação</Label>
          <Select
            value={formData.operationMode}
            onValueChange={(value) =>
              setFormData({ ...formData, operationMode: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="continuous">Contínuo</SelectItem>
              <SelectItem value="triggered">Gatilho</SelectItem>
              <SelectItem value="scheduled">Agendado</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="referenceValue">Valor de Referência</Label>
          <Input
            id="referenceValue"
            type="number"
            value={formData.referenceValue}
            onChange={(e) =>
              setFormData({
                ...formData,
                referenceValue: parseFloat(e.target.value) || 0,
              })
            }
            step="0.1"
          />
        </div>
        <div className="flex items-center space-x-2 mt-6">
          <Switch
            id="saveToFlash"
            checked={formData.saveToFlash}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, saveToFlash: checked })
            }
          />
          <Label htmlFor="saveToFlash">Salvar na Flash</Label>
        </div>
      </div>

      {formData.controlType === "pid" && (
        <div className="space-y-4 border-t pt-4">
          <h4 className="text-sm font-medium">Parâmetros PID</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="pidKp">Kp (Proporcional)</Label>
              <Input
                id="pidKp"
                type="number"
                value={formData.pidKp || 1.0}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pidKp: parseFloat(e.target.value) || 0,
                  })
                }
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="pidKi">Ki (Integral)</Label>
              <Input
                id="pidKi"
                type="number"
                value={formData.pidKi || 0.1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pidKi: parseFloat(e.target.value) || 0,
                  })
                }
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="pidKd">Kd (Derivativo)</Label>
              <Input
                id="pidKd"
                type="number"
                value={formData.pidKd || 0.01}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pidKd: parseFloat(e.target.value) || 0,
                  })
                }
                step="0.001"
              />
            </div>
          </div>
        </div>
      )}

      {formData.controlType === "operation" && (
        <div className="space-y-4 border-t pt-4">
          <div>
            <Label htmlFor="operationId">Operação Associada</Label>
            <Select
              value={formData.operationId || ""}
              onValueChange={(value) =>
                setFormData({ ...formData, operationId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar operação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="joystick_y">Joystick Y</SelectItem>
                <SelectItem value="temp_sensor">
                  Sensor de Temperatura
                </SelectItem>
                <SelectItem value="pump_control">Controle de Bomba</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

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
