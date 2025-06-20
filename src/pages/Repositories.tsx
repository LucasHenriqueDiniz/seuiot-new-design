import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Database,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Activity,
  Cpu,
  Clock,
} from "lucide-react";

const repositories = [
  {
    id: 1,
    name: "EXEMPLO 1",
    description: "Sistema de monitoramento industrial para linha de produção A",
    status: "Ativo",
    devices: 8,
    operations: 12,
    lastSync: "há 2 min",
    created: "15/12/2024",
  },
  {
    id: 2,
    name: "EXEMPLO 2",
    description: "Controle de temperatura e umidade para estufas automatizadas",
    status: "Sincronizando",
    devices: 4,
    operations: 6,
    lastSync: "há 5 min",
    created: "12/12/2024",
  },
  {
    id: 3,
    name: "Projeto Alpha",
    description: "Prototipagem de sensores para monitoramento ambiental",
    status: "Offline",
    devices: 0,
    operations: 0,
    lastSync: "há 2h",
    created: "08/12/2024",
  },
  {
    id: 4,
    name: "Smart Home Beta",
    description: "Automação residencial inteligente com controle por voz",
    status: "Ativo",
    devices: 15,
    operations: 24,
    lastSync: "há 1 min",
    created: "05/12/2024",
  },
  {
    id: 5,
    name: "Energy Monitor",
    description: "Sistema de monitoramento de consumo energético empresarial",
    status: "Manutenção",
    devices: 6,
    operations: 3,
    lastSync: "há 30 min",
    created: "01/12/2024",
  },
];

const statusColors = {
  Ativo: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Sincronizando:
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Offline: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  Manutenção:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
};

interface RepositoriesProps {
  selectedRepository: string | null;
  selectedDevice: string | null;
  onSelectRepository: (repoId: string | null) => void;
  onSelectDevice: (deviceId: string | null) => void;
}

export default function Repositories({
  selectedRepository,
  selectedDevice,
  onSelectRepository,
  onSelectDevice,
}: RepositoriesProps) {
  return (
    <Layout
      title="Repositórios"
      selectedRepository={selectedRepository}
      selectedDevice={selectedDevice}
      onSelectRepository={onSelectRepository}
      onSelectDevice={onSelectDevice}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Repositórios</h1>
            <p className="text-muted-foreground">
              Gerencie seus repositórios IoT e configurações de dispositivos
            </p>
          </div>
          <Button className="w-fit">
            <Plus className="h-4 w-4 mr-2" />
            Novo Repositório
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar repositórios..." className="pl-10" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filtrar por Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Todos</DropdownMenuItem>
              <DropdownMenuItem>Ativos</DropdownMenuItem>
              <DropdownMenuItem>Offline</DropdownMenuItem>
              <DropdownMenuItem>Sincronizando</DropdownMenuItem>
              <DropdownMenuItem>Manutenção</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Repository Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repositories.map((repo) => (
            <Card key={repo.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Database className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{repo.name}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Badge
                  className={
                    statusColors[repo.status as keyof typeof statusColors]
                  }
                >
                  {repo.status}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {repo.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-semibold">{repo.devices}</span>{" "}
                      dispositivos
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-semibold">{repo.operations}</span>{" "}
                      operações
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Sync: {repo.lastSync}</span>
                  </div>
                  <span>Criado: {repo.created}</span>
                </div>

                <div className="flex pt-2">
                  <Button size="sm" className="flex-1" onClick={() => onSelectRepository(String(repo.id))}>
                    <Eye className="h-4 w-4 mr-2" />
                    Abrir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
