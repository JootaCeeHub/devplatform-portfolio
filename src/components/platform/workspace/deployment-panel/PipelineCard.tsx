
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  XCircle,
  RefreshCw,
  Clock
} from "lucide-react";

interface PipelineCardProps {
  pipeline: {
    name: string;
    status: string;
    duration: string;
    steps: Array<{
      name: string;
      status: string;
      duration: string;
    }>;
  };
}

export const PipelineCard = ({ pipeline }: PipelineCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-green-500";
      case "running": return "text-blue-500";
      case "failed": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return CheckCircle;
      case "running": return RefreshCw;
      case "failed": return XCircle;
      default: return Clock;
    }
  };

  const StatusIcon = getStatusIcon(pipeline.status);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <StatusIcon className={`w-5 h-5 ${getStatusColor(pipeline.status)} ${pipeline.status === 'running' ? 'animate-spin' : ''}`} />
            {pipeline.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{pipeline.duration}</Badge>
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pipeline.steps.map((step, stepIndex) => {
            const StepIcon = getStatusIcon(step.status);
            return (
              <div key={stepIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                <div className="flex items-center gap-3">
                  <StepIcon className={`w-4 h-4 ${getStatusColor(step.status)} ${step.status === 'running' ? 'animate-spin' : ''}`} />
                  <span className="font-medium">{step.name}</span>
                </div>
                <span className="text-sm text-muted-foreground font-mono">{step.duration}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
