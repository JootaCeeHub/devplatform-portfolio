
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Rocket,
  Settings,
  Play
} from "lucide-react";
import { EnvironmentCard } from "./deployment-panel/EnvironmentCard";
import { DeploymentHistory } from "./deployment-panel/DeploymentHistory";
import { PipelineCard } from "./deployment-panel/PipelineCard";

export const DeploymentPanel = () => {
  const [isDeploying, setIsDeploying] = useState(false);

  const environments = [
    {
      name: "production",
      label: "Producción",
      url: "https://myapp.com",
      status: "healthy",
      lastDeploy: "Hace 2 horas",
      version: "v2.1.4",
      uptime: "99.9%"
    },
    {
      name: "staging",
      label: "Staging",
      url: "https://staging.myapp.com",
      status: "deploying",
      lastDeploy: "Desplegando...",
      version: "v2.2.0-beta",
      uptime: "99.5%"
    },
    {
      name: "development",
      label: "Desarrollo",
      url: "https://dev.myapp.com",
      status: "error",
      lastDeploy: "Hace 1 día",
      version: "v2.2.0-alpha",
      uptime: "95.2%"
    }
  ];

  const deployments = [
    {
      id: 1,
      environment: "production",
      version: "v2.1.4",
      status: "success",
      duration: "2m 34s",
      timestamp: "2024-01-15 14:30:00",
      commit: "feat: add user authentication",
      author: "Alice Johnson",
      branch: "main"
    },
    {
      id: 2,
      environment: "staging",
      version: "v2.2.0-beta",
      status: "deploying",
      duration: "1m 12s",
      timestamp: "2024-01-15 15:45:00",
      commit: "fix: resolve payment gateway issue",
      author: "Bob Smith",
      branch: "feature/payment-fix"
    },
    {
      id: 3,
      environment: "development",
      version: "v2.2.0-alpha",
      status: "failed",
      duration: "45s",
      timestamp: "2024-01-14 16:20:00",
      commit: "refactor: update database schema",
      author: "Charlie Brown",
      branch: "develop"
    }
  ];

  const cicdPipelines = [
    {
      name: "Build & Test",
      status: "success",
      duration: "3m 45s",
      steps: [
        { name: "Checkout Code", status: "success", duration: "12s" },
        { name: "Install Dependencies", status: "success", duration: "1m 23s" },
        { name: "Run Tests", status: "success", duration: "2m 10s" }
      ]
    },
    {
      name: "Security Scan",
      status: "success",
      duration: "1m 32s",
      steps: [
        { name: "Dependency Check", status: "success", duration: "45s" },
        { name: "Code Analysis", status: "success", duration: "47s" }
      ]
    },
    {
      name: "Deploy to Staging",
      status: "running",
      duration: "2m 15s",
      steps: [
        { name: "Build Docker Image", status: "success", duration: "1m 30s" },
        { name: "Push to Registry", status: "success", duration: "45s" },
        { name: "Deploy to Kubernetes", status: "running", duration: "..." }
      ]
    }
  ];

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
    }, 5000);
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border bg-card">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Panel de Despliegue
          </h1>
          <p className="text-muted-foreground">Gestiona despliegues y monitorea tus aplicaciones</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="hover:scale-105 transition-transform">
            <Settings className="w-4 h-4 mr-2" />
            Configurar CI/CD
          </Button>
          <Button onClick={handleDeploy} disabled={isDeploying} className="hover:scale-105 transition-transform">
            <Rocket className="w-4 h-4 mr-2" />
            {isDeploying ? "Desplegando..." : "Desplegar"}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <Tabs defaultValue="environments" className="space-y-6">
          <TabsList className="bg-muted p-1 rounded-lg">
            <TabsTrigger value="environments" className="data-[state=active]:bg-background">Entornos</TabsTrigger>
            <TabsTrigger value="deployments" className="data-[state=active]:bg-background">Historial</TabsTrigger>
            <TabsTrigger value="pipelines" className="data-[state=active]:bg-background">CI/CD</TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-background">Monitoreo</TabsTrigger>
          </TabsList>

          <TabsContent value="environments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {environments.map((env) => (
                <EnvironmentCard key={env.name} environment={env} />
              ))}
            </div>

            {/* Quick Deploy Section */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Despliegue Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Branch</label>
                    <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                      <option>main</option>
                      <option>develop</option>
                      <option>feature/new-ui</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Entorno</label>
                    <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                      <option>staging</option>
                      <option>production</option>
                      <option>development</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full hover:scale-105 transition-transform">
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar Despliegue
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deployments" className="space-y-6">
            <DeploymentHistory deployments={deployments} />
          </TabsContent>

          <TabsContent value="pipelines" className="space-y-6">
            <div className="space-y-6">
              {cicdPipelines.map((pipeline, index) => (
                <PipelineCard key={index} pipeline={pipeline} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23%</div>
                  <Progress value={23} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Memory</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.2GB</div>
                  <Progress value={60} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">145ms</div>
                  <p className="text-xs text-muted-foreground">Avg last 24h</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0.1%</div>
                  <p className="text-xs text-muted-foreground">Last 24h</p>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Logs */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Logs en Tiempo Real</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-lg h-64 overflow-auto">
                  <div>[2024-01-15 15:42:31] INFO: Server started on port 3000</div>
                  <div>[2024-01-15 15:42:32] INFO: Database connected successfully</div>
                  <div>[2024-01-15 15:43:01] GET /api/users - 200 OK (23ms)</div>
                  <div>[2024-01-15 15:43:15] POST /api/auth/login - 200 OK (156ms)</div>
                  <div>[2024-01-15 15:43:28] GET /api/projects - 200 OK (45ms)</div>
                  <div>[2024-01-15 15:43:45] WARN: High memory usage detected (85%)</div>
                  <div>[2024-01-15 15:44:02] GET /api/deployments - 200 OK (67ms)</div>
                  <div className="animate-pulse">[2024-01-15 15:44:18] INFO: Health check passed</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
