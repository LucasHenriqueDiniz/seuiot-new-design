import {
  Bell,
  Globe,
  Settings,
  Moon,
  Sun,
  User,
  Palette,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";

interface HeaderProps {
  title: string;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  selectedRepository?: string | null;
  selectedDevice?: string | null;
}

export function Header({
  title,
  onToggleSidebar,
  isSidebarOpen,
  selectedRepository,
  selectedDevice,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <TooltipProvider>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-4 lg:px-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden text-foreground hover:bg-accent"
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-current"></div>
              <div className="w-full h-0.5 bg-current"></div>
              <div className="w-full h-0.5 bg-current"></div>
            </div>
          </Button>

          <div className="flex items-center space-x-3">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D0BAQFp8mfRd8OtzA/company-logo_200_200/company-logo_200_200/0/1701729299316/s_iot_logo?e=1755734400&v=beta&t=DoENV2IofSgeckyg9xDAxpc6GH4pBqZkJhu_DqFfjuU"
              alt="Seu IoT Logo"
              className="w-8 h-8 rounded-lg"
              onError={(e) => {
                // Fallback to gradient icon if image fails to load
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center hidden">
              <span className="text-primary-foreground font-bold text-sm">
                I
              </span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">Seu IoT</h1>
          </div>

          <div className="hidden sm:block">
            <span className="text-muted-foreground">|</span>
            <span className="ml-3 text-lg font-medium text-foreground">
              {title}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-foreground hover:bg-accent"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">PT</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <span className="flex items-center space-x-2">
                  <span>🇧🇷</span>
                  <span>Português</span>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="flex items-center space-x-2">
                  <span>🇺🇸</span>
                  <span>English</span>
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative text-foreground hover:bg-accent"
              >
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs bg-red-500 text-white">
                  2
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Notificações</h3>
                <p className="text-xs text-muted-foreground">2 não lidas</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <DropdownMenuItem className="flex items-start space-x-3 p-4">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Thing 3 desconectado</p>
                    <p className="text-xs text-muted-foreground">
                      Dispositivo perdeu conexão há 5 minutos
                    </p>
                    <p className="text-xs text-muted-foreground">há 5 min</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-start space-x-3 p-4">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Temperatura alta detectada
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Sensor registrou 35°C no EXEMPLO 1
                    </p>
                    <p className="text-xs text-muted-foreground">há 12 min</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-start space-x-3 p-4 opacity-60">
                  <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Sistema atualizado</p>
                    <p className="text-xs text-muted-foreground">
                      Nova versão instalada com sucesso
                    </p>
                    <p className="text-xs text-muted-foreground">há 2h</p>
                  </div>
                </DropdownMenuItem>
              </div>
              <div className="p-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center"
                >
                  Ver todas as notificações
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-foreground hover:bg-accent"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Alternar tema</p>
            </TooltipContent>
          </Tooltip>

          {/* Settings Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground hover:bg-accent"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center">
                  <Palette className="w-4 h-4 mr-2" />
                  Configurações Visuais
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center">
                  <Bell className="w-4 h-4 mr-2" />
                  Configurações de Notificação
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Segurança e Privacidade
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <HelpCircle className="w-4 h-4 mr-2" />
                Ajuda e Suporte
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-foreground hover:bg-accent"
              >
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <User className="w-3 h-3 text-primary-foreground" />
                </div>
                <span className="hidden sm:inline text-sm">Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Configurações da Conta
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </TooltipProvider>
  );
}
