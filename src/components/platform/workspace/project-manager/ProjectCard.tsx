
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MoreHorizontal,
  GitBranch,
  AlertCircle,
  Clock,
  ExternalLink,
  Edit,
  Star
} from "lucide-react";

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    status: string;
    progress: number;
    priority: string;
    dueDate: string;
    team: Array<{ name: string; avatar: string; role: string }>;
    technologies: string[];
    lastActivity: string;
    commits: number;
    issues: { open: number; closed: number };
  };
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "planning": return "bg-yellow-500";
      case "completed": return "bg-blue-500";
      case "paused": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-500 bg-red-50";
      case "medium": return "text-yellow-500 bg-yellow-50";
      case "low": return "text-green-500 bg-green-50";
      default: return "text-gray-500 bg-gray-50";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {project.name}
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
              <span className="text-sm text-muted-foreground capitalize">{project.status}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progreso</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Team */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.team.map((member, index) => (
              <Avatar key={index} className="w-8 h-8 border-2 border-background">
                <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
              </Avatar>
            ))}
            {project.team.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                +{project.team.length - 3}
              </div>
            )}
          </div>
          <Badge variant="outline" className={getPriorityColor(project.priority)}>
            {project.priority}
          </Badge>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.technologies.length - 3}
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <GitBranch className="w-3 h-3" />
            <span>{project.commits}</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>{project.issues.open}/{project.issues.open + project.issues.closed}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{project.lastActivity}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" className="flex-1">
            <ExternalLink className="w-3 h-3 mr-1" />
            Abrir
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-3 h-3" />
          </Button>
          <Button variant="outline" size="sm">
            <Star className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
