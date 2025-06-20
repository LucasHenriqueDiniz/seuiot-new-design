import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Palette,
  Bell,
  Shield,
  User,
  Globe,
  Database,
  Wifi,
  Save,
} from "lucide-react";

interface SettingsProps {
  selectedRepository: string | null;
  selectedDevice: string | null;
  onSelectRepository: (repoId: string | null) => void;
  onSelectDevice: (deviceId: string | null) => void;
}

export default function Settings({
  selectedRepository,
  selectedDevice,
  onSelectRepository,
  onSelectDevice,
}: SettingsProps) {
  const [settings, setSettings] = useState({
    // Visual Settings
    theme: "light",
    language: "pt",
    compactMode: false,
    animationsEnabled: true,

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    deviceAlerts: true,
    temperatureAlerts: true,
    connectivityAlerts: true,

    // Account Settings
    username: "admin",
    email: "admin@seuiot.com",

    // System Settings
    autoRefresh: true,
    refreshInterval: 30,
    dataRetention: 30,
    connectionTimeout: 10,
  });

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved:", settings);
  };

  return (
    <Layout
      title="Configurações"
      selectedRepository={selectedRepository}
      selectedDevice={selectedDevice}
      onSelectRepository={onSelectRepository}
      onSelectDevice={onSelectDevice}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">
            Configure as preferências do sistema e da conta
          </p>
        </div>

        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="visual" className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span>Visual</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center space-x-2"
            >
              <Bell className="h-4 w-4" />
              <span>Notificações</span>
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>Conta</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Sistema</span>
            </TabsTrigger>
          </TabsList>

          {/* Visual Settings */}
          <TabsContent value="visual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Aparência</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="theme">Tema</Label>
                    <Select
                      value={settings.theme}
                      onValueChange={(value) =>
                        setSettings({ ...settings, theme: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Idioma</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) =>
                        setSettings({ ...settings, language: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt">Português</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="compactMode">Modo Compacto</Label>
                  <Switch
                    id="compactMode"
                    checked={settings.compactMode}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, compactMode: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="animations">Animações</Label>
                  <Switch
                    id="animations"
                    checked={settings.animationsEnabled}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, animationsEnabled: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Notificação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications">Email</Label>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                  <Switch
                    id="pushNotifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, pushNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="deviceAlerts">Alertas de Dispositivo</Label>
                  <Switch
                    id="deviceAlerts"
                    checked={settings.deviceAlerts}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, deviceAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="temperatureAlerts">
                    Alertas de Temperatura
                  </Label>
                  <Switch
                    id="temperatureAlerts"
                    checked={settings.temperatureAlerts}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, temperatureAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="connectivityAlerts">
                    Alertas de Conectividade
                  </Label>
                  <Switch
                    id="connectivityAlerts"
                    checked={settings.connectivityAlerts}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, connectivityAlerts: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="username">Nome de Usuário</Label>
                  <Input
                    id="username"
                    value={settings.username}
                    onChange={(e) =>
                      setSettings({ ...settings, username: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) =>
                      setSettings({ ...settings, email: e.target.value })
                    }
                  />
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    Alterar Senha
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoRefresh">Atualização Automática</Label>
                  <Switch
                    id="autoRefresh"
                    checked={settings.autoRefresh}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, autoRefresh: checked })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="refreshInterval">
                    Intervalo de Atualização (segundos)
                  </Label>
                  <Input
                    id="refreshInterval"
                    type="number"
                    value={settings.refreshInterval}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        refreshInterval: parseInt(e.target.value),
                      })
                    }
                    min="5"
                    max="300"
                  />
                </div>

                <div>
                  <Label htmlFor="dataRetention">
                    Retenção de Dados (dias)
                  </Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        dataRetention: parseInt(e.target.value),
                      })
                    }
                    min="1"
                    max="365"
                  />
                </div>

                <div>
                  <Label htmlFor="connectionTimeout">
                    Timeout de Conexão (segundos)
                  </Label>
                  <Input
                    id="connectionTimeout"
                    type="number"
                    value={settings.connectionTimeout}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        connectionTimeout: parseInt(e.target.value),
                      })
                    }
                    min="5"
                    max="60"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </div>
    </Layout>
  );
}
