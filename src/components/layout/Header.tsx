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
      <header className="fixed top-0 left-0 right-0 z-50 bg-blue-600/95 backdrop-blur-md border-b border-blue-500/30 h-16 flex items-center justify-between px-4 lg:px-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden text-white hover:bg-white/10"
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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center hidden">
              <span className="text-white font-bold text-sm">I</span>
            </div>
            <h1 className="text-xl font-semibold text-white">Seu IoT</h1>
          </div>

          <div className="hidden sm:block">
            <span className="text-blue-200">|</span>
            <span className="ml-3 text-lg font-medium text-white">{title}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-white hover:bg-white/10"
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

          {/* Notifications with Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative text-white hover:bg-white/10"
              >
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs bg-red-500 text-white">
                  2
                </Badge>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-semibold">2 novas notificações</p>
                <p className="text-xs">• Dispositivo desconectado</p>
                <p className="text-xs">• Temperatura alta detectada</p>
              </div>
            </TooltipContent>
          </Tooltip>

          {/* Theme Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-white hover:bg-white/10"
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
                className="text-white hover:bg-white/10"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Palette className="w-4 h-4 mr-2" />
                Configurações Visuais
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="w-4 h-4 mr-2" />
                Configurações de Notificação
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield className="w-4 h-4 mr-2" />
                Segurança e Privacidade
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
                className="flex items-center space-x-2 text-white hover:bg-white/10"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
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
