import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  BarChart3,
  Maximize2,
  RefreshCw,
  Edit,
  Settings,
  MoreHorizontal,
  GripVertical,
  Pause,
  Play,
  Trash2,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Chart, getChartTypeInfo } from "./Chart";

interface GraphData {
  id: string;
  title: string;
  type: "operation" | "instrumentation";
  sourceId: string;
  order: number;
  chartType: "bar" | "line" | "pie" | "gauge" | "area";
}

interface GraphsTabProps {
  operations: any[];
  instrumentations: any[];
}

const initialGraphs: GraphData[] = [
  {
    id: "graph_1",
    title: "Joystick Y",
    type: "operation",
    sourceId: "joystick_y_001",
    order: 1,
    chartType: "bar",
  },
  {
    id: "graph_2",
    title: "Sensor de Temperatura",
    type: "operation",
    sourceId: "temp_sensor_002",
    order: 2,
    chartType: "line",
  },
  {
    id: "graph_3",
    title: "Monitor de Temperatura",
    type: "instrumentation",
    sourceId: "temp_monitor_001",
    order: 3,
    chartType: "gauge",
  },
  {
    id: "graph_4",
    title: "Distribuição de Status",
    type: "instrumentation",
    sourceId: "status_dist_001",
    order: 4,
    chartType: "pie",
  },
];

export function GraphsTab({ operations, instrumentations }: GraphsTabProps) {
  const [graphs, setGraphs] = useState<GraphData[]>(initialGraphs);
  const [editMode, setEditMode] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedGraph, setExpandedGraph] = useState<GraphData | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const sortedGraphs = [...graphs].sort((a, b) => a.order - b.order);

  const handleExpandGraph = (graph: GraphData) => {
    setExpandedGraph(graph);
  };

  const handleRefresh = () => {
    // Refresh all graphs
    console.log("Refreshing all graphs");
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, graphId: string) => {
    setDraggedItem(graphId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetGraphId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetGraphId) return;

    const draggedGraph = graphs.find((g) => g.id === draggedItem);
    const targetGraph = graphs.find((g) => g.id === targetGraphId);

    if (!draggedGraph || !targetGraph) return;

    const newGraphs = graphs.map((graph) => {
      if (graph.id === draggedItem) {
        return { ...graph, order: targetGraph.order };
      }
      if (graph.id === targetGraphId) {
        return { ...graph, order: draggedGraph.order };
      }
      return graph;
    });

    setGraphs(newGraphs);
    setDraggedItem(null);
  };

  const handleDeleteGraph = (graphId: string) => {
    setGraphs(graphs.filter((g) => g.id !== graphId));
  };

  const generateMockData = (type: string) => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      let value;
      if (type.includes("Joystick")) {
        value = 50 + Math.sin(i * 0.3) * 30 + (Math.random() - 0.5) * 10;
      } else if (type.includes("Temperatura")) {
        value = 65 + Math.sin(i * 0.1) * 15 + (Math.random() - 0.5) * 5;
      } else {
        value = Math.random() * 100 + Math.sin(i * 0.2) * 20 + 40;
      }
      points.push(Math.max(0, Math.min(100, value)));
    }
    return points;
  };

  const GraphCard = ({ graph }: { graph: GraphData }) => {
    const data = generateMockData(graph.title);
    const maxValue = Math.max(...data);
    const avgValue = data.reduce((sum, val) => sum + val, 0) / data.length;

    return (
      <Card
        className={cn(
          "relative group transition-all duration-200",
          editMode && "ring-2 ring-blue-200 cursor-move",
          isPaused && "opacity-75",
        )}
        draggable={editMode}
        onDragStart={(e) => handleDragStart(e, graph.id)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, graph.id)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {editMode && (
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
              )}
              <CardTitle className="text-sm">{graph.title}</CardTitle>
              <div className="flex items-center space-x-1">
                <Badge variant="outline" className="text-xs">
                  {graph.type}
                </Badge>
                <span
                  className="text-xs"
                  title={getChartTypeInfo(graph.chartType).name}
                >
                  {getChartTypeInfo(graph.chartType).icon}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {!editMode && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleExpandGraph(graph)}
                >
                  <Maximize2 className="h-3 w-3" />
                </Button>
              )}

              {editMode && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Configurar
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <span className="text-xs text-muted-foreground">
                        Tipo de Gráfico:
                      </span>
                    </DropdownMenuItem>
                    {["bar", "line", "pie", "gauge", "area"].map((type) => (
                      <DropdownMenuItem
                        key={type}
                        onClick={() => {
                          const newGraphs = graphs.map((g) =>
                            g.id === graph.id
                              ? { ...g, chartType: type as any }
                              : g,
                          );
                          setGraphs(newGraphs);
                        }}
                        className={graph.chartType === type ? "bg-accent" : ""}
                      >
                        <span className="mr-2">
                          {getChartTypeInfo(type).icon}
                        </span>
                        {getChartTypeInfo(type).name}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem
                      onClick={() => handleDeleteGraph(graph.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remover
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Chart
            data={data}
            type={graph.chartType}
            title={graph.title}
            isPaused={isPaused}
          />

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="text-center">
              <p className="text-muted-foreground">Máx</p>
              <p className="font-bold">{maxValue.toFixed(1)}</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Média</p>
              <p className="font-bold">{avgValue.toFixed(1)}</p>
            </div>
          </div>
        </CardContent>

        {isPaused && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Badge variant="secondary">Pausado</Badge>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Gráficos</h3>
          <p className="text-sm text-muted-foreground">
            Monitoramento visual de operações e instrumentações
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isPaused}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newGraph: GraphData = {
                id: `graph_${Date.now()}`,
                title: `Novo Gráfico ${graphs.length + 1}`,
                type: "operation",
                sourceId: "temp_sensor_002",
                order: graphs.length + 1,
                chartType: "bar",
              };
              setGraphs([...graphs, newGraph]);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>

          <Button
            variant={editMode ? "default" : "outline"}
            size="sm"
            onClick={toggleEditMode}
          >
            {editMode ? (
              <>
                <Play className="h-4 w-4 mr-2" />
                Finalizar Edição
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </>
            )}
          </Button>
        </div>
      </div>

      {editMode && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Pause className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Modo de Edição Ativo
            </span>
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
            Gráficos pausados. Arraste para reordenar ou use o menu para
            configurar.
          </p>
        </div>
      )}

      {/* Graphs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedGraphs.map((graph) => (
          <GraphCard key={graph.id} graph={graph} />
        ))}
      </div>

      {sortedGraphs.length === 0 && (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">
                Nenhum gráfico configurado
              </h3>
              <p className="text-muted-foreground mb-4">
                Configure gráficos para visualizar dados de operações e
                instrumentações
              </p>
              <Button>
                <BarChart3 className="h-4 w-4 mr-2" />
                Adicionar Gráfico
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Expanded Graph Modal */}
      <Dialog
        open={!!expandedGraph}
        onOpenChange={() => setExpandedGraph(null)}
      >
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{expandedGraph?.title}</DialogTitle>
          </DialogHeader>
          {expandedGraph && (
            <div className="flex-1 space-y-4">
              <div className="h-96 border rounded-lg bg-background relative">
                <div className="absolute inset-4 flex items-end justify-between">
                  {generateMockData(expandedGraph.title).map((value, i) => (
                    <div
                      key={i}
                      className="bg-primary rounded-t-sm min-w-[4px] flex-1 mx-[2px] transition-all duration-300"
                      style={{ height: `${value}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {["Máximo", "Mínimo", "Média", "Desvio"].map((label, i) => (
                  <div key={label} className="text-center">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-xl font-bold text-primary">
                      {(Math.random() * 100).toFixed(1)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
