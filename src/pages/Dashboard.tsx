import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Database,
  Cpu,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Eye,
  Settings,
  Upload,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Definindo tipos para controle de mudanças
type ChangeType = "positive" | "neutral";

// Updated stats cards - removed connectivity rate and replaced with more relevant metrics
const statsCards = [
  {
    title: "Repositórios",
    value: "5",
    change: "+1",
    changeType: "positive" as ChangeType,
    icon: Database,
    description: "Total de repositórios",
  },
  {
    title: "Dispositivos",
    value: "12",
    change: "+2",
    changeType: "positive" as ChangeType,
    icon: Cpu,
    description: "Dispositivos registrados",
  },
  {
    title: "Comandos",
    value: "28",
    change: "+5",
    changeType: "positive" as ChangeType,
    icon: Activity,
    description: "Comandos configurados",
  },
  {
    title: "Última Atividade",
    value: "5min",
    change: "",
    changeType: "neutral" as ChangeType,
    icon: Clock,
    description: "Desde a última comunicação",
  },
];

// Updated recent repositories - removed status that doesn't exist
const recentRepositories = [
  {
    name: "EXEMPLO 1",
    devices: 8,
    lastSync: "há 2 min",
    operations: 12,
  },
  {
    name: "EXEMPLO 2",
    devices: 4,
    lastSync: "há 5 min",
    operations: 6,
  },
  {
    name: "Projeto Alpha",
    devices: 0,
    lastSync: "há 2h",
    operations: 0,
  },
];

interface DashboardProps {
  selectedRepository: string | null;
  selectedDevice: string | null;
  onSelectRepository: (repoId: string | null) => void;
  onSelectDevice: (deviceId: string | null) => void;
}

export default function Dashboard({
  selectedRepository,
  selectedDevice,
  onSelectRepository,
  onSelectDevice,
}: DashboardProps) {
  return (
    <Layout
      title="Dashboard"
      selectedRepository={selectedRepository}
      selectedDevice={selectedDevice}
      onSelectRepository={onSelectRepository}
      onSelectDevice={onSelectDevice}
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo ao Seu IoT
          </h1>
          <p className="text-muted-foreground">
            Monitore e gerencie seus dispositivos IoT em tempo real
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="flex items-center space-x-2">
                  {stat.change && (
                    <div
                      className={cn(
                        "flex items-center space-x-1 text-xs",
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : "text-muted-foreground"
                      )}
                    >
                      {stat.changeType === "positive" && (
                        <TrendingUp className="h-3 w-3" />
                      )}
                      <span>{stat.change}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Repositories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Repositórios Recentes</span>
              <Button variant="outline" size="sm" asChild>
                <Link to="/repositories">
                  <span>Ver Todos</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRepositories.map((repo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Database className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {repo.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {repo.devices} dispositivos • {repo.operations} comandos
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        Atualizado {repo.lastSync}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/repositories/${repo.name.toLowerCase().replace(" ", "-")}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/repositories/${repo.name.toLowerCase().replace(" ", "-")}/settings`}>
                          <Settings className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/repositories/new">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                    <Database className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Novo Repositório</h3>
                    <p className="text-sm text-muted-foreground">
                      Criar um novo repositório IoT
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/devices">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                    <Cpu className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Conectar Dispositivo</h3>
                    <p className="text-sm text-muted-foreground">
                      Adicionar novo dispositivo IoT
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/firmware-install">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    <Upload className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Instalar Firmware</h3>
                    <p className="text-sm text-muted-foreground">
                      Configurar e instalar firmware em dispositivos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
