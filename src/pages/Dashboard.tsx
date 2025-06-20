import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Database,
  Cpu,
  Wifi,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Eye,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statsCards = [
  {
    title: "Repositórios Ativos",
    value: "5",
    change: "+12%",
    changeType: "positive" as const,
    icon: Database,
    description: "Total de repositórios configurados",
  },
  {
    title: "Dispositivos Conectados",
    value: "12",
    change: "+2",
    changeType: "positive" as const,
    icon: Cpu,
    description: "Dispositivos online no momento",
  },
  {
    title: "Taxa de Conectividade",
    value: "94.2%",
    change: "-2.1%",
    changeType: "negative" as const,
    icon: Wifi,
    description: "Média das últimas 24h",
  },
  {
    title: "Operações Ativas",
    value: "28",
    change: "+5",
    changeType: "positive" as const,
    icon: Activity,
    description: "Operações em execução",
  },
];

const recentRepositories = [
  {
    name: "EXEMPLO 1",
    status: "Ativo",
    devices: 8,
    lastSync: "há 2 min",
    operations: 12,
  },
  {
    name: "EXEMPLO 2",
    status: "Sincronizando",
    devices: 4,
    lastSync: "há 5 min",
    operations: 6,
  },
  {
    name: "Projeto Alpha",
    status: "Offline",
    devices: 0,
    lastSync: "há 2h",
    operations: 0,
  },
];

const statusColors = {
  Ativo: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Sincronizando:
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Offline: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
};

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
                  <div
                    className={cn(
                      "flex items-center space-x-1 text-xs",
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600",
                    )}
                  >
                    {stat.changeType === "positive" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>{stat.change}</span>
                  </div>
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
              <Button variant="outline" size="sm">
                Ver Todos
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
                        {repo.devices} dispositivos • {repo.operations}{" "}
                        operações
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge
                        className={
                          statusColors[repo.status as keyof typeof statusColors]
                        }
                      >
                        {repo.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {repo.lastSync}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
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

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                  <Activity className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Ver Relatórios</h3>
                  <p className="text-sm text-muted-foreground">
                    Análises e métricas detalhadas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
