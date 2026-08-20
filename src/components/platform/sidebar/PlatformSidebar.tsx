
import { useState } from "react";
import { 
  Code2, 
  FolderKanban, 
  Rocket, 
  FileText, 
  Users, 
  Bot,
  Settings,
  Search,
  Plus,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface PlatformSidebarProps {
  currentView: 'editor' | 'projects' | 'deploy' | 'docs';
  onViewChange: (view: 'editor' | 'projects' | 'deploy' | 'docs') => void;
  onToggleCollaboration: () => void;
  onToggleAI: () => void;
}

export const PlatformSidebar = ({ 
  currentView, 
  onViewChange, 
  onToggleCollaboration, 
  onToggleAI 
}: PlatformSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    files: true,
    projects: true,
    recent: true
  });

  const navigationItems = [
    { id: 'editor', icon: Code2, label: 'Editor', badge: null },
    { id: 'projects', icon: FolderKanban, label: 'Proyectos', badge: '3' },
    { id: 'deploy', icon: Rocket, label: 'Deploy', badge: null },
    { id: 'docs', icon: FileText, label: 'Documentación', badge: null },
  ];

  const recentFiles = [
    { name: 'app.tsx', path: '/src/app.tsx', modified: '2 min ago' },
    { name: 'index.css', path: '/src/index.css', modified: '5 min ago' },
    { name: 'utils.ts', path: '/src/lib/utils.ts', modified: '1 hora ago' },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Code2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <h1 className="font-bold text-lg">DevPlatform</h1>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar archivos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 h-9"
              onClick={() => onViewChange(item.id as any)}
            >
              <item.icon className="w-4 h-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        <Separator className="my-2" />

        {/* Quick Actions */}
        <div className="p-2 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 h-9"
            onClick={onToggleCollaboration}
          >
            <Users className="w-4 h-4" />
            <span>Colaboración</span>
            <Badge variant="outline" className="ml-auto text-xs">Live</Badge>
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 h-9"
            onClick={onToggleAI}
          >
            <Bot className="w-4 h-4" />
            <span>Asistente IA</span>
            <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
          </Button>
        </div>

        <Separator className="my-2" />

        {/* File Explorer */}
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-1 h-8 p-1"
            onClick={() => toggleSection('files')}
          >
            {expandedSections.files ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">Archivos</span>
            <Plus className="w-3 h-3 ml-auto opacity-60 hover:opacity-100" />
          </Button>

          {expandedSections.files && (
            <div className="ml-4 mt-1 space-y-1">
              {recentFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-1 rounded text-sm hover:bg-sidebar-accent cursor-pointer"
                >
                  <FileText className="w-3 h-3 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{file.name}</div>
                    <div className="text-xs text-muted-foreground">{file.modified}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Projects */}
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-1 h-8 p-1"
            onClick={() => toggleSection('recent')}
          >
            {expandedSections.recent ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">Proyectos Recientes</span>
          </Button>

          {expandedSections.recent && (
            <div className="ml-4 mt-1 space-y-1">
              <div className="p-2 rounded bg-sidebar-accent/50">
                <div className="font-medium text-sm">E-commerce App</div>
                <div className="text-xs text-muted-foreground">React • TypeScript</div>
              </div>
              <div className="p-2 rounded hover:bg-sidebar-accent cursor-pointer">
                <div className="font-medium text-sm">Landing Page</div>
                <div className="text-xs text-muted-foreground">Next.js • Tailwind</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border">
        <Button variant="ghost" className="w-full justify-start gap-2 h-9">
          <Settings className="w-4 h-4" />
          <span>Configuración</span>
        </Button>
      </div>
    </div>
  );
};
