
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertTriangle,
  Clock,
  ExternalLink,
  Eye,
  Terminal,
  Rocket
} from "lucide-react";

interface EnvironmentCardProps {
  environment: {
    name: string;
    label: string;
    url: string;
    status: string;
    lastDeploy: string;
    version: string;
    uptime: string;
  };
}

export const EnvironmentCard = ({ environment }: EnvironmentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-green-500";
      case "deploying": return "text-blue-500";
      case "error": return "text-red-500";
      case "warning": return "text-yellow-500";
      default: return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return CheckCircle;
      case "deploying": return RefreshCw;
      case "error": return XCircle;
      case "warning": return AlertTriangle;
      default: return Clock;
    }
  };

  const StatusIcon = getStatusIcon(environment.status);

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{environment.label}</CardTitle>
          <div className={`flex items-center gap-2 ${getStatusColor(environment.status)}`}>
            <StatusIcon className={`w-4 h-4 ${environment.status === 'deploying' ? 'animate-spin' : ''}`} />
            <span className="text-sm capitalize font-medium">{environment.status}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">URL:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                {environment.url}
              </span>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Versión:</span>
            <Badge variant="outline" className="font-mono">{environment.version}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Último deploy:</span>
            <span className="font-medium">{environment.lastDeploy}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Uptime:</span>
            <span className="text-green-600 font-bold">{environment.uptime}</span>
          </div>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" className="flex-1">
            <Rocket className="w-3 h-3 mr-1" />
            Desplegar
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="w-3 h-3" />
          </Button>
          <Button variant="outline" size="sm">
            <Terminal className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
