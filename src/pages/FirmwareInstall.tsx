import { Layout } from "@/components/layout/Layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Step, Stepper } from "@/components/ui/stepper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AlertTriangle,
    Cable,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Cpu,
    Download,
    Loader2,
    RefreshCw,
    Server,
    Usb,
    Wifi,
    XCircle
} from "lucide-react";
import { useEffect, useState } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface FirmwareInstallProps {
  selectedRepository: string | null;
  selectedDevice: string | null;
  onSelectRepository: (repoId: string | null) => void;
  onSelectDevice: (deviceId: string | null) => void;
}

type ConnectionMethod = "usb" | "wifi";
type InstallationStep = "connect" | "select" | "configure" | "install" | "complete" | "error";

const firmwareVersions = [
  { id: "v1.0.0", name: "v1.0.0 (Estável)", description: "Versão estável para produção" },
  { id: "v1.1.0", name: "v1.1.0 (Beta)", description: "Suporte a novos sensores" },
  { id: "v1.2.0", name: "v1.2.0 (Dev)", description: "Melhorias de performance e novos recursos" },
];

const repositories = [
  { id: "example1", name: "EXEMPLO 1", icon: "🏭" },
  { id: "example2", name: "EXEMPLO 2", icon: "🌱" },
  { id: "smart-home", name: "Smart Home Beta", icon: "🏠" },
  { id: "energy-monitor", name: "Energy Monitor", icon: "⚡" },
];

const deviceModels = [
  { id: "esp32", name: "ESP32", description: "Microcontrolador dual-core com WiFi/BT" },
  { id: "esp32-s3", name: "ESP32-S3", description: "Dual-core LX7 com mais RAM e periféricos" },
  { id: "esp32-c3", name: "ESP32-C3", description: "RISC-V Single-core com WiFi/BT" },
  { id: "esp8266", name: "ESP8266", description: "Clássico microcontrolador WiFi" },
];

export default function FirmwareInstall({
  selectedRepository,
  selectedDevice,
  onSelectRepository,
  onSelectDevice,
}: FirmwareInstallProps) {
  const [currentStep, setCurrentStep] = useState<InstallationStep>("connect");
  const [connectionMethod, setConnectionMethod] = useState<ConnectionMethod>("usb");
  const [firmwareVersion, setFirmwareVersion] = useState<string | null>(null);
  const [repositoryId, setRepositoryId] = useState<string | null>(null);
  const [deviceName, setDeviceName] = useState("");
  const [deviceModel, setDeviceModel] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [installationLogs, setInstallationLogs] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deviceCreated, setDeviceCreated] = useState(false);

  useEffect(() => {
    // Reset state when connectionMethod changes
    setIsConnected(false);
    setProgress(0);
  }, [connectionMethod]);

  const connectDevice = async () => {
    setInstallationLogs([]);
    addLog("Tentando estabelecer conexão com o dispositivo...");

    try {
      // Simulate WebSerial connection
      if (connectionMethod === "usb") {
        addLog("Solicitando acesso à porta serial...");
        await simulateDelay(800);
        addLog("Porta serial detectada: COM4 (USB)");
        await simulateDelay(500);
        addLog("Conectado com sucesso à 115200 baud");
      } else {
        addLog("Iniciando conexão WiFi...");
        await simulateDelay(800);
        addLog("Procurando por dispositivos na rede...");
        await simulateDelay(1000);
        addLog("Dispositivo encontrado: ESP32 (192.168.1.105)");
        await simulateDelay(500);
        addLog("Conectado via WiFi");
      }

      setIsConnected(true);
      addLog("Conexão estabelecida com sucesso!");
      // Move to next step automatically
      await simulateDelay(500);
      setCurrentStep("select");
    } catch (error) {
      addLog("Erro ao conectar dispositivo: " + (error as Error).message);
    }
  };

  const installFirmware = async () => {
    if (!firmwareVersion || !repositoryId || !deviceName || !deviceModel) {
      return;
    }

    setCurrentStep("install");
    setProgress(0);
    addLog(`Iniciando instalação do firmware ${firmwareVersion}...`);

    try {
      // Simulate installation process
      addLog("Verificando compatibilidade...");
      await simulateProgress(0, 10);

      addLog("Preparando dispositivo para gravação...");
      await simulateProgress(10, 20);

      addLog("Fazendo backup das configurações...");
      await simulateProgress(20, 30);

      addLog("Apagando flash...");
      await simulateProgress(30, 45);

      addLog(`Gravando firmware ${firmwareVersion}...`);
      await simulateProgress(45, 85);

      addLog("Verificando integridade da instalação...");
      await simulateProgress(85, 95);

      addLog("Reiniciando dispositivo...");
      await simulateProgress(95, 100);

      addLog("✅ Instalação concluída com sucesso!");
      setCurrentStep("complete");
      setDeviceCreated(true);
    } catch (error) {
      addLog("❌ Erro na instalação: " + (error as Error).message);
      setCurrentStep("error");
    }
  };

  const simulateProgress = async (start: number, end: number) => {
    const increment = (end - start) / 10;
    for (let i = 0; i <= 10; i++) {
      setProgress(Math.min(start + increment * i, end));
      await simulateDelay(150);
    }
  };

  const simulateDelay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const addLog = (message: string) => {
    setInstallationLogs((prev) => [...prev, message]);
  };

  const resetInstallation = () => {
    setProgress(0);
    setCurrentStep("connect");
    setFirmwareVersion(null);
    setRepositoryId(null);
    setDeviceModel(null);
    setIsConnected(false);
  };

  const showDisconnectDialog = () => {
    if (isConnected) {
      setIsDialogOpen(true);
    }
  };

  const handleDisconnect = () => {
    setIsDialogOpen(false);
    setIsConnected(false);
    resetInstallation();
  };

  const getFirmwareVersionName = (id: string | null) => {
    if (!id) return "";
    const version = firmwareVersions.find(v => v.id === id);
    return version?.name || "";
  };

  const getRepositoryName = (id: string | null) => {
    if (!id) return "";
    const repo = repositories.find(r => r.id === id);
    return repo?.name || "";
  };

  const getRepositoryIcon = (id: string | null) => {
    if (!id) return "";
    const repo = repositories.find(r => r.id === id);
    return repo?.icon || "";
  };

  const getDeviceModelName = (id: string | null) => {
    if (!id) return "";
    const model = deviceModels.find(m => m.id === id);
    return model?.name || "";
  };

  return (
    <Layout
      title="Instalar Firmware"
      selectedRepository={selectedRepository}
      selectedDevice={selectedDevice}
      onSelectRepository={onSelectRepository}
      onSelectDevice={onSelectDevice}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Instalação de Firmware</h1>
          <p className="text-muted-foreground mt-1">
            Conecte, configure e instale o firmware em seus dispositivos IoT
          </p>
        </div>

        {/* Connection status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span
              className={`h-3 w-3 rounded-full ${
                isConnected ? "bg-green-500" : "bg-gray-300"
              }`}
            ></span>
            <span className="text-sm font-medium">
              {isConnected ? "Dispositivo conectado" : "Dispositivo desconectado"}
            </span>
          </div>
          {isConnected && (
            <Button
              variant="outline"
              size="sm"
              onClick={showDisconnectDialog}
              className="text-red-500 hover:text-red-600"
            >
              Desconectar
            </Button>
          )}
        </div>

        {/* Installation Steps */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <div className="flex justify-between items-center">
              <CardTitle>Assistente de Instalação</CardTitle>
              {isConnected && (
                <Button variant="ghost" size="sm" onClick={resetInstallation}>
                  <RefreshCw className="h-4 w-4 mr-1" /> Reiniciar
                </Button>
              )}
            </div>            <div className="mt-6 mb-2">
              <Stepper 
                activeStep={
                  currentStep === "connect" ? 0 :
                  currentStep === "select" ? 1 :
                  currentStep === "configure" ? 2 :
                  currentStep === "install" ? 3 :
                  4
                }
              >
                <Step title="Conectar" index={0} />
                <Step title="Selecionar" index={1} />
                <Step title="Configurar" index={2} />
                <Step title="Instalar" index={3} />
                <Step title="Concluir" index={4} />
              </Stepper>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            {currentStep === "connect" && (
              <div className="space-y-6">
                <div className="text-center">
                  <Cpu className="h-12 w-12 mx-auto text-primary mb-2" />
                  <h2 className="text-xl font-semibold mb-2">Conectar Dispositivo</h2>
                  <p className="text-muted-foreground">
                    Selecione o método de conexão e conecte seu dispositivo
                  </p>
                </div>

                <div className="flex flex-col space-y-4">
                  <Tabs
                    defaultValue={connectionMethod}
                    onValueChange={(value) => setConnectionMethod(value as ConnectionMethod)}
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="usb">
                        <Cable className="h-4 w-4 mr-2" />
                        USB/Serial
                      </TabsTrigger>
                      <TabsTrigger value="wifi">
                        <Wifi className="h-4 w-4 mr-2" />
                        WiFi
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="usb" className="mt-4 space-y-4">
                      <div className="text-sm space-y-4">
                        <Alert className="bg-primary/5 border-primary/20">
                          <Usb className="h-4 w-4 text-primary" />
                          <AlertTitle>Conexão via USB</AlertTitle>
                          <AlertDescription>
                            Conecte seu dispositivo ESP via cabo USB ao seu computador.
                            Certifique-se de que os drivers estão instalados.
                          </AlertDescription>
                        </Alert>
                        
                        <Accordion type="single" collapsible>
                          <AccordionItem value="drivers">
                            <AccordionTrigger className="text-sm">
                              <span className="text-primary">Problemas com drivers?</span>
                            </AccordionTrigger>
                            <AccordionContent className="text-xs">
                              <p>
                                Para o ESP32/ESP8266, você pode precisar instalar drivers CP210x ou CH340.
                                <Button variant="link" size="sm" className="px-0 h-auto text-xs">
                                  Baixar drivers
                                </Button>
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      <Button
                        className="w-full"
                        disabled={isConnected}
                        onClick={connectDevice}
                      >
                        <Usb className="h-4 w-4 mr-2" />
                        {isConnected ? "Conectado" : "Conectar via USB"}
                      </Button>
                    </TabsContent>

                    <TabsContent value="wifi" className="mt-4 space-y-4">
                      <div className="text-sm space-y-4">
                        <Alert className="bg-primary/5 border-primary/20">
                          <Wifi className="h-4 w-4 text-primary" />
                          <AlertTitle>Conexão via WiFi</AlertTitle>
                          <AlertDescription>
                            Certifique-se de que seu dispositivo está com modo de programação 
                            WiFi ativado e na mesma rede que este computador.
                          </AlertDescription>
                        </Alert>

                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="Endereço IP (opcional)"
                              className="text-sm"
                            />
                            <Input
                              placeholder="Porta (opcional)"
                              className="text-sm"
                              defaultValue="3232"
                            />
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="secondary"
                        className="w-full"
                        disabled={isConnected}
                        onClick={connectDevice}
                      >
                        <Wifi className="h-4 w-4 mr-2" />
                        {isConnected ? "Conectado" : "Conectar via WiFi"}
                      </Button>
                    </TabsContent>
                  </Tabs>

                  {installationLogs.length > 0 && (
                    <div className="border rounded-md p-3 mt-4 bg-muted/20">
                      <h3 className="text-sm font-medium mb-2">Log de Conexão</h3>
                      <div className="bg-black/90 text-green-400 p-2 rounded font-mono text-xs h-32 overflow-y-auto">
                        {installationLogs.map((log, index) => (
                          <div key={index}>
                            <span className="text-gray-500">
                              [{new Date().toLocaleTimeString()}]
                            </span>{" "}
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === "select" && (
              <div className="space-y-6">
                <div className="text-center">
                  <Download className="h-12 w-12 mx-auto text-primary mb-2" />
                  <h2 className="text-xl font-semibold mb-2">Selecionar Firmware</h2>
                  <p className="text-muted-foreground">
                    Escolha a versão do firmware e o modelo do dispositivo
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Modelo do Dispositivo</label>
                    <Select
                      value={deviceModel || ""}
                      onValueChange={setDeviceModel}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Modelos Compatíveis</SelectLabel>
                          {deviceModels.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              <div className="flex flex-col">
                                <span>{model.name}</span>
                                <span className="text-xs text-muted-foreground">{model.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Versão do Firmware</label>
                    <Select
                      value={firmwareVersion || ""}
                      onValueChange={setFirmwareVersion}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a versão" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Versões Disponíveis</SelectLabel>
                          {firmwareVersions.map((version) => (
                            <SelectItem key={version.id} value={version.id}>
                              <div className="flex flex-col">
                                <span>{version.name}</span>
                                <span className="text-xs text-muted-foreground">{version.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("connect")}
                  >
                    Voltar
                  </Button>
                  <Button
                    disabled={!deviceModel || !firmwareVersion}
                    onClick={() => setCurrentStep("configure")}
                  >
                    Avançar
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "configure" && (
              <div className="space-y-6">
                <div className="text-center">
                  <Server className="h-12 w-12 mx-auto text-primary mb-2" />
                  <h2 className="text-xl font-semibold mb-2">Configurar Dispositivo</h2>
                  <p className="text-muted-foreground">
                    Configure o nome e o repositório vinculado
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome do Dispositivo</label>
                    <Input
                      value={deviceName}
                      onChange={(e) => setDeviceName(e.target.value)}
                      placeholder="Ex: Sensor Temp 001"
                    />
                    <p className="text-xs text-muted-foreground">
                      Dê um nome único ao seu dispositivo para identificá-lo facilmente
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Repositório Vinculado</label>
                    <Select
                      value={repositoryId || ""}
                      onValueChange={setRepositoryId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Vincular a um repositório" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Repositórios Disponíveis</SelectLabel>
                          {repositories.map((repo) => (
                            <SelectItem key={repo.id} value={repo.id}>
                              <div className="flex items-center">
                                <span className="mr-2">{repo.icon}</span>
                                <span>{repo.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Vincule seu dispositivo a um repositório para organizar seus dispositivos IoT
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("select")}
                  >
                    Voltar
                  </Button>
                  <Button
                    disabled={!deviceName || !repositoryId}
                    onClick={installFirmware}
                  >
                    Instalar Firmware
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "install" && (
              <div className="space-y-6">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 mx-auto text-primary animate-spin mb-2" />
                  <h2 className="text-xl font-semibold mb-2">Instalando Firmware</h2>
                  <p className="text-muted-foreground">
                    Isso pode levar alguns minutos. Não desligue o dispositivo.
                  </p>

                  <div className="mt-6 space-y-2">
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm font-medium">{progress.toFixed(0)}%</p>
                  </div>
                </div>

                {installationLogs.length > 0 && (
                  <div className="border rounded-md p-3 mt-4 bg-muted/20">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">Log de Instalação</h3>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-black/90 text-green-400 p-2 rounded font-mono text-xs h-32 overflow-y-auto">
                      {installationLogs.map((log, index) => (
                        <div key={index}>
                          <span className="text-gray-500">
                            [{new Date().toLocaleTimeString()}]
                          </span>{" "}
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === "complete" && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="h-12 w-12 mx-auto text-green-500 mb-2 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Instalação Concluída!</h2>
                  <p className="text-muted-foreground">
                    Seu dispositivo foi configurado com sucesso
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Nome do dispositivo</span>
                    <span>{deviceName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Modelo</span>
                    <span>{getDeviceModelName(deviceModel)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Firmware</span>
                    <span>{getFirmwareVersionName(firmwareVersion)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Repositório</span>
                    <div className="flex items-center">
                      <span className="mr-2">{getRepositoryIcon(repositoryId)}</span>
                      <span>{getRepositoryName(repositoryId)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 pt-4">
                  <Button onClick={() => setCurrentStep("connect")}>
                    Instalar em Outro Dispositivo
                  </Button>
                  <Button variant="outline" onClick={() => {
                    if (repositoryId) {
                      onSelectRepository(repositoryId);
                      window.location.href = `/repositories/${repositoryId}`;
                    }
                  }}>
                    Ir para o Repositório
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "error" && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="h-12 w-12 mx-auto text-red-500 mb-2 rounded-full bg-red-50 flex items-center justify-center">
                    <XCircle className="h-8 w-8" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Falha na Instalação</h2>
                  <p className="text-muted-foreground">
                    Ocorreu um erro durante a instalação do firmware
                  </p>
                </div>

                {installationLogs.length > 0 && (
                  <div className="border rounded-md p-3 mt-4 bg-red-50/30">
                    <h3 className="text-sm font-medium mb-2">Log de Erros</h3>
                    <div className="bg-black/90 text-red-400 p-2 rounded font-mono text-xs h-32 overflow-y-auto">
                      {installationLogs.map((log, index) => (
                        <div key={index}>
                          <span className="text-gray-500">
                            [{new Date().toLocaleTimeString()}]
                          </span>{" "}
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Alert className="bg-amber-50 border-yellow-200">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-800">Dicas para solução</AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li>Verifique se o dispositivo está conectado corretamente</li>
                      <li>Certifique-se de que o modelo selecionado está correto</li>
                      <li>Tente reiniciar o dispositivo</li>
                      <li>Verifique se há espaço suficiente na memória flash</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("connect")}
                  >
                    Voltar ao Início
                  </Button>
                  <Button
                    onClick={() => installFirmware()}
                    variant="default"
                  >
                    Tentar Novamente
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Disconnect Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Desconectar dispositivo?</DialogTitle>
            <DialogDescription>
              Deseja realmente desconectar o dispositivo? Todo o progresso será perdido.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDisconnect}
            >
              Desconectar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
