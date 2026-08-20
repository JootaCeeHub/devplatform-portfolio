
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FolderPlus,
  Settings
} from "lucide-react";
import { ProjectCard } from "./project-manager/ProjectCard";
import { TemplateCard } from "./project-manager/TemplateCard";
import { ProjectFilters } from "./project-manager/ProjectFilters";
import { AnalyticsCards } from "./project-manager/AnalyticsCards";

export const ProjectManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const projects = [
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Sistema completo de comercio electrónico con React y Node.js",
      status: "active",
      progress: 75,
      priority: "high",
      dueDate: "2024-02-15",
      team: [
        { name: "Alice", avatar: "A", role: "Frontend" },
        { name: "Bob", avatar: "B", role: "Backend" },
        { name: "Charlie", avatar: "C", role: "Designer" }
      ],
      technologies: ["React", "Node.js", "MongoDB", "Tailwind"],
      lastActivity: "Hace 2 horas",
      commits: 156,
      issues: { open: 3, closed: 12 }
    },
    {
      id: 2,
      name: "Task Management App",
      description: "Aplicación de gestión de tareas con colaboración en tiempo real",
      status: "planning",
      progress: 20,
      priority: "medium",
      dueDate: "2024-03-01",
      team: [
        { name: "Diana", avatar: "D", role: "Fullstack" },
        { name: "Eve", avatar: "E", role: "UI/UX" }
      ],
      technologies: ["Vue.js", "Firebase", "TypeScript"],
      lastActivity: "Hace 1 día",
      commits: 23,
      issues: { open: 8, closed: 2 }
    },
    {
      id: 3,
      name: "Analytics Dashboard",
      description: "Dashboard interactivo para análisis de datos empresariales",
      status: "completed",
      progress: 100,
      priority: "low",
      dueDate: "2024-01-30",
      team: [
        { name: "Frank", avatar: "F", role: "Data Engineer" },
        { name: "Grace", avatar: "G", role: "Frontend" }
      ],
      technologies: ["Next.js", "D3.js", "PostgreSQL"],
      lastActivity: "Hace 1 semana",
      commits: 89,
      issues: { open: 0, closed: 15 }
    }
  ];

  const templates = [
    {
      name: "React Starter",
      description: "Proyecto base con React, TypeScript y Tailwind CSS",
      category: "Frontend",
      icon: "⚛️"
    },
    {
      name: "Node.js API",
      description: "API REST con Express, JWT y MongoDB",
      category: "Backend",
      icon: "🚀"
    },
    {
      name: "Full Stack App",
      description: "Aplicación completa con React frontend y Node.js backend",
      category: "Full Stack",
      icon: "🔧"
    },
    {
      name: "Landing Page",
      description: "Página de aterrizaje responsive con animaciones",
      category: "Marketing",
      icon: "🎨"
    }
  ];

  const analyticsStats = {
    totalProjects: 12,
    activeProjects: 8,
    totalCommits: 1247,
    issuesResolved: 156
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || project.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border bg-card">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Gestor de Proyectos
          </h1>
          <p className="text-muted-foreground">Administra tus proyectos y colabora con tu equipo</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="hover:scale-105 transition-transform">
            <Settings className="w-4 h-4 mr-2" />
            Configuración
          </Button>
          <Button className="hover:scale-105 transition-transform">
            <FolderPlus className="w-4 h-4 mr-2" />
            Nuevo Proyecto
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-muted p-1 rounded-lg">
            <TabsTrigger value="projects" className="data-[state=active]:bg-background">Mis Proyectos</TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-background">Templates</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-background">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <ProjectFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates.map((template, index) => (
                <TemplateCard key={index} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsCards stats={analyticsStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
