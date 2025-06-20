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
  TrendingUp,
  TrendingDown,
  Equal,
} from "lucide-react";

export interface InstrumentationConfig {
  id: string;
  name: string;
  sensorOperation: string; // Reference to operation
  referenceInstrumentation?: string; // Reference to another instrumentation
  useRawData: boolean;
  type: "linear" | "quantification";
  // Comparator settings
  comparatorType: "greater" | "less" | "equal" | "range";
  thresholdValue?: number;
  rangeMin?: number;
  rangeMax?: number;
  // Linear transformation settings
  linearScale?: number;
  linearOffset?: number;
  // Quantification settings
  quantificationLevels?: number;
  currentValue: number;
  status: "active" | "inactive" | "alarm";
}

interface InstrumentationProps {
  instrumentation: InstrumentationConfig;
  onEdit: (instrumentation: InstrumentationConfig) => void;
  onDelete: (id: string) => void;
  onViewChart: (instrumentation: InstrumentationConfig) => void;
}

export function Instrumentation({
  instrumentation,
  onEdit,
  onDelete,
  onViewChart,
}: InstrumentationProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "alarm":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getComparatorIcon = () => {
    switch (instrumentation.comparatorType) {
      case "greater":
        return TrendingUp;
      case "less":
        return TrendingDown;
      case "equal":
        return Equal;
      case "range":
        return BarChart3;
      default:
        return BarChart3;
    }
  };

  const ComparatorIcon = getComparatorIcon();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-base">
                {instrumentation.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                {instrumentation.type} • {instrumentation.sensorOperation}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(instrumentation.status)}>
              {instrumentation.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(instrumentation)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewChart(instrumentation)}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Ver Gráfico
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(instrumentation.id)}
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
            <span className="text-muted-foreground">Fonte:</span>
            <span className="ml-2 font-medium">
              {instrumentation.useRawData ? "Dados Brutos" : "Instrumentação"}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Comparador:</span>
            <div className="flex items-center ml-2">
              <ComparatorIcon className="h-3 w-3 mr-1" />
              <span className="font-medium capitalize">
                {instrumentation.comparatorType}
              </span>
            </div>
          </div>
        </div>

        {instrumentation.type === "linear" && (
          <div className="border-t pt-3">
            <p className="text-xs text-muted-foreground mb-2">
              Transformação Linear:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Escala:</span>
                <span className="ml-1 font-medium">
                  {instrumentation.linearScale || 1}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Offset:</span>
                <span className="ml-1 font-medium">
                  {instrumentation.linearOffset || 0}
                </span>
              </div>
            </div>
          </div>
        )}

        {instrumentation.type === "quantification" && (
          <div className="border-t pt-3">
            <p className="text-xs text-muted-foreground mb-2">Quantificação:</p>
            <div className="text-xs">
              <span className="text-muted-foreground">Níveis:</span>
              <span className="ml-1 font-medium">
                {instrumentation.quantificationLevels || 8}
              </span>
            </div>
          </div>
        )}

        {instrumentation.comparatorType === "range" ? (
          <div className="border-t pt-3">
            <p className="text-xs text-muted-foreground mb-2">Intervalo:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Min:</span>
                <span className="ml-1 font-medium">
                  {instrumentation.rangeMin || 0}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Max:</span>
                <span className="ml-1 font-medium">
                  {instrumentation.rangeMax || 100}
                </span>
              </div>
            </div>
          </div>
        ) : (
          instrumentation.thresholdValue !== undefined && (
            <div className="border-t pt-3">
              <p className="text-xs text-muted-foreground mb-2">Limiar:</p>
              <span className="text-sm font-medium">
                {instrumentation.thresholdValue}
              </span>
            </div>
          )
        )}

        <div className="border-t pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Valor Atual:</span>
            <span className="text-lg font-bold text-primary">
              {instrumentation.currentValue}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface InstrumentationFormProps {
  instrumentation?: InstrumentationConfig;
  onSave: (instrumentation: InstrumentationConfig) => void;
  onCancel: () => void;
}

export function InstrumentationForm({
  instrumentation,
  onSave,
  onCancel,
}: InstrumentationFormProps) {
  const [formData, setFormData] = useState<InstrumentationConfig>(
    instrumentation || {
      id: "",
      name: "",
      sensorOperation: "",
      useRawData: true,
      type: "linear",
      comparatorType: "greater",
      thresholdValue: 0,
      linearScale: 1,
      linearOffset: 0,
      quantificationLevels: 8,
      currentValue: 0,
      status: "inactive",
    },
  );

  const handleSave = () => {
    if (!formData.id) {
      formData.id = `instrumentation_${Date.now()}`;
    }
    onSave(formData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome da Instrumentação</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Monitor de Temperatura"
          />
        </div>
        <div>
          <Label htmlFor="sensorOperation">Operação de Sensor</Label>
          <Select
            value={formData.sensorOperation}
            onValueChange={(value) =>
              setFormData({ ...formData, sensorOperation: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar operação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="joystick_y">Joystick Y</SelectItem>
              <SelectItem value="temp_sensor">Sensor de Temperatura</SelectItem>
              <SelectItem value="pressure_sensor">Sensor de Pressão</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="referenceInstrumentation">
            Instrumentação de Referência
          </Label>
          <Select
            value={formData.referenceInstrumentation || ""}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                referenceInstrumentation: value,
                useRawData: !value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Usar dados brutos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Dados Brutos</SelectItem>
              <SelectItem value="temp_monitor">
                Monitor de Temperatura
              </SelectItem>
              <SelectItem value="pressure_monitor">
                Monitor de Pressão
              </SelectItem>
            </SelectContent>
          </Select>
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
              <SelectItem value="linear">Linear</SelectItem>
              <SelectItem value="quantification">Quantificação</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {formData.type === "linear" && (
        <div className="space-y-4 border-t pt-4">
          <h4 className="text-sm font-medium">
            Transformação Linear (y = ax + b)
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="linearScale">Escala (a)</Label>
              <Input
                id="linearScale"
                type="number"
                value={formData.linearScale || 1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    linearScale: parseFloat(e.target.value) || 1,
                  })
                }
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="linearOffset">Offset (b)</Label>
              <Input
                id="linearOffset"
                type="number"
                value={formData.linearOffset || 0}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    linearOffset: parseFloat(e.target.value) || 0,
                  })
                }
                step="0.1"
              />
            </div>
          </div>
        </div>
      )}

      {formData.type === "quantification" && (
        <div className="space-y-4 border-t pt-4">
          <h4 className="text-sm font-medium">Quantificação</h4>
          <div>
            <Label htmlFor="quantificationLevels">Número de Níveis</Label>
            <Input
              id="quantificationLevels"
              type="number"
              value={formData.quantificationLevels || 8}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantificationLevels: parseInt(e.target.value) || 8,
                })
              }
              min="2"
              max="256"
            />
          </div>
        </div>
      )}

      <div className="space-y-4 border-t pt-4">
        <h4 className="text-sm font-medium">Comparador</h4>
        <div>
          <Label htmlFor="comparatorType">Tipo de Comparação</Label>
          <Select
            value={formData.comparatorType}
            onValueChange={(value: any) =>
              setFormData({ ...formData, comparatorType: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="greater">Maior que</SelectItem>
              <SelectItem value="less">Menor que</SelectItem>
              <SelectItem value="equal">Igual a</SelectItem>
              <SelectItem value="range">Intervalo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.comparatorType === "range" ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rangeMin">Valor Mínimo</Label>
              <Input
                id="rangeMin"
                type="number"
                value={formData.rangeMin || 0}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rangeMin: parseFloat(e.target.value) || 0,
                  })
                }
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="rangeMax">Valor Máximo</Label>
              <Input
                id="rangeMax"
                type="number"
                value={formData.rangeMax || 100}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rangeMax: parseFloat(e.target.value) || 100,
                  })
                }
                step="0.1"
              />
            </div>
          </div>
        ) : (
          <div>
            <Label htmlFor="thresholdValue">Valor de Referência</Label>
            <Input
              id="thresholdValue"
              type="number"
              value={formData.thresholdValue || 0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  thresholdValue: parseFloat(e.target.value) || 0,
                })
              }
              step="0.1"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>
          {instrumentation ? "Atualizar" : "Criar"} Instrumentação
        </Button>
      </div>
    </div>
  );
}
