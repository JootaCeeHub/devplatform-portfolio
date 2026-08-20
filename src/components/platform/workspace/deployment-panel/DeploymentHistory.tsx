
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  XCircle,
  RefreshCw,
  Clock
} from "lucide-react";

interface DeploymentHistoryProps {
  deployments: Array<{
    id: number;
    environment: string;
    version: string;
    status: string;
    duration: string;
    timestamp: string;
    commit: string;
    author: string;
    branch: string;
  }>;
}

export const DeploymentHistory = ({ deployments }: DeploymentHistoryProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-green-500";
      case "deploying": return "text-blue-500";
      case "failed": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return CheckCircle;
      case "deploying": return RefreshCw;
      case "failed": return XCircle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-4">
      {deployments.map((deployment) => {
        const StatusIcon = getStatusIcon(deployment.status);
        return (
          <Card key={deployment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 ${getStatusColor(deployment.status)}`}>
                    <StatusIcon className={`w-4 h-4 ${deployment.status === 'deploying' ? 'animate-spin' : ''}`} />
                    <span className="font-medium capitalize">{deployment.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{deployment.environment}</Badge>
                    <Badge variant="secondary" className="font-mono">{deployment.version}</Badge>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {deployment.timestamp}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Commit: </span>
                  <span className="font-mono bg-muted px-1 rounded text-xs">
                    {deployment.commit}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Autor: </span>
                  <span className="font-medium">{deployment.author}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Branch: </span>
                  <span className="font-mono bg-muted px-1 rounded text-xs">
                    {deployment.branch}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Duración: </span>
                  <span className="font-bold">{deployment.duration}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
