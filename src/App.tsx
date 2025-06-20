import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Dashboard from "./pages/Dashboard";
import Repositories from "./pages/Repositories";
import Devices from "./pages/Devices";
import FirmwareInstall from "./pages/FirmwareInstall";
import RepositoryDetail from "./pages/RepositoryDetail";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();

const App = () => {
  const [selectedRepository, setSelectedRepository] = useState<string | null>(
    null,
  );
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    selectedRepository={selectedRepository}
                    selectedDevice={selectedDevice}
                    onSelectRepository={setSelectedRepository}
                    onSelectDevice={setSelectedDevice}
                  />
                }
              />
              <Route
                path="/repositories"
                element={
                  <Repositories
                    selectedRepository={selectedRepository}
                    selectedDevice={selectedDevice}
                    onSelectRepository={setSelectedRepository}
                    onSelectDevice={setSelectedDevice}
                  />
                }
              />
              <Route
                path="/repositories/:id"
                element={
                  <RepositoryDetail
                    selectedRepository={selectedRepository}
                    selectedDevice={selectedDevice}
                    onSelectRepository={setSelectedRepository}
                    onSelectDevice={setSelectedDevice}
                  />
                }
              />
              <Route
                path="/devices"
                element={
                  <Devices
                    selectedRepository={selectedRepository}
                    selectedDevice={selectedDevice}
                    onSelectRepository={setSelectedRepository}
                    onSelectDevice={setSelectedDevice}
                  />
                }
              />
              <Route
                path="/firmware-install"
                element={
                  <FirmwareInstall
                    selectedRepository={selectedRepository}
                    selectedDevice={selectedDevice}
                    onSelectRepository={setSelectedRepository}
                    onSelectDevice={setSelectedDevice}
                  />
                }
              />
              <Route
                path="/settings"
                element={
                  <Settings
                    selectedRepository={selectedRepository}
                    selectedDevice={selectedDevice}
                    onSelectRepository={setSelectedRepository}
                    onSelectDevice={setSelectedDevice}
                  />
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
