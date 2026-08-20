
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText,
  Search,
  Plus,
  BookOpen,
  Code,
  GitBranch,
  Users,
  Clock,
  Edit,
  Eye,
  Download,
  Share,
  Star,
  Tag,
  Folder,
  FileCode,
  Image,
  Video,
  Link,
  Settings,
  Filter,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Upload
} from "lucide-react";

export const DocumentationPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["getting-started", "api"]);

  const documentStructure = [
    {
      id: "getting-started",
      name: "Getting Started",
      type: "folder",
      children: [
        { id: "intro", name: "Introducción", type: "doc", lastModified: "Hace 2 días", author: "Alice" },
        { id: "setup", name: "Configuración", type: "doc", lastModified: "Hace 1 semana", author: "Bob" },
        { id: "first-steps", name: "Primeros Pasos", type: "doc", lastModified: "Hace 3 días", author: "Charlie" }
      ]
    },
    {
      id: "api",
      name: "API Reference",
      type: "folder",
      children: [
        { id: "authentication", name: "Autenticación", type: "doc", lastModified: "Hace 1 día", author: "Alice" },
        { id: "endpoints", name: "Endpoints", type: "doc", lastModified: "Hace 2 horas", author: "Diana" },
        { id: "examples", name: "Ejemplos", type: "doc", lastModified: "Hace 5 días", author: "Eve" }
      ]
    },
    {
      id: "guides",
      name: "Guías",
      type: "folder",
      children: [
        { id: "deployment", name: "Despliegue", type: "doc", lastModified: "Hace 1 semana", author: "Frank" },
        { id: "testing", name: "Testing", type: "doc", lastModified: "Hace 3 días", author: "Grace" },
        { id: "best-practices", name: "Mejores Prácticas", type: "doc", lastModified: "Hace 2 días", author: "Henry" }
      ]
    }
  ];

  const recentDocs = [
    {
      id: 1,
      title: "API Authentication Guide",
      description: "Guía completa para implementar autenticación en la API",
      category: "API",
      author: "Alice Johnson",
      lastModified: "Hace 2 horas",
      status: "published",
      views: 245,
      tags: ["api", "auth", "security"]
    },
    {
      id: 2,
      title: "Component Library",
      description: "Documentación de todos los componentes React reutilizables",
      category: "Frontend",
      author: "Bob Smith",
      lastModified: "Hace 1 día",
      status: "draft",
      views: 89,
      tags: ["react", "components", "ui"]
    },
    {
      id: 3,
      title: "Database Schema",
      description: "Esquema de base de datos y relaciones entre tablas",
      category: "Backend",
      author: "Charlie Brown",
      lastModified: "Hace 3 días",
      status: "review",
      views: 156,
      tags: ["database", "schema", "postgresql"]
    }
  ];

  const templates = [
    {
      name: "API Documentation",
      description: "Template para documentar APIs REST",
      category: "API",
      icon: Code
    },
    {
      name: "User Guide",
      description: "Guía de usuario paso a paso",
      category: "Guide",
      icon: BookOpen
    },
    {
      name: "Technical Spec",
      description: "Especificación técnica detallada",
      category: "Technical",
      icon: FileCode
    },
    {
      name: "Release Notes",
      description: "Notas de versión y changelog",
      category: "Release",
      icon: GitBranch
    }
  ];

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "review": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold">Centro de Documentación</h1>
          <p className="text-muted-foreground">Crea, organiza y comparte documentación técnica</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configuración
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Documento
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar Navigation */}
        <div className="w-80 border-r border-border bg-muted/20 p-4">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar documentos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Documento
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Importar
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Star className="w-4 h-4 mr-2" />
                Favoritos
              </Button>
            </div>

            {/* Document Structure */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Estructura</h3>
              <div className="space-y-1">
                {documentStructure.map((item) => (
                  <div key={item.id}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-8 px-2"
                      onClick={() => toggleFolder(item.id)}
                    >
                      {expandedFolders.includes(item.id) ? (
                        <ChevronDown className="w-3 h-3 mr-1" />
                      ) : (
                        <ChevronRight className="w-3 h-3 mr-1" />
                      )}
                      <Folder className="w-4 h-4 mr-2" />
                      <span className="text-sm">{item.name}</span>
                    </Button>
                    
                    {expandedFolders.includes(item.id) && (
                      <div className="ml-6 space-y-1">
                        {item.children.map((child) => (
                          <Button
                            key={child.id}
                            variant="ghost"
                            className="w-full justify-start h-7 px-2 text-xs"
                          >
                            <FileText className="w-3 h-3 mr-2" />
                            {child.name}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Tabs defaultValue="browse" className="space-y-6">
            <TabsList>
              <TabsTrigger value="browse">Explorar</TabsTrigger>
              <TabsTrigger value="recent">Recientes</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-6">
              {/* Filters */}
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {["all", "published", "draft", "review"].map((status) => (
                    <Button
                      key={status}
                      variant={selectedCategory === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(status)}
                    >
                      {status === "all" ? "Todos" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Más filtros
                </Button>
              </div>

              {/* Document Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentDocs.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{doc.title}</CardTitle>
                          <Badge variant="outline" className={getStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {doc.description}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{doc.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{doc.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{doc.lastModified}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-6">
              <div className="space-y-4">
                {recentDocs.map((doc) => (
                  <Card key={doc.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <FileText className="w-8 h-8 text-muted-foreground" />
                          <div>
                            <h3 className="font-semibold">{doc.title}</h3>
                            <p className="text-sm text-muted-foreground">{doc.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className={getStatusColor(doc.status)}>
                                {doc.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{doc.lastModified}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.map((template, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="text-center">
                      <template.icon className="w-12 h-12 mx-auto mb-2 text-primary" />
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline">{template.category}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {template.description}
                      </p>
                      <Button className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Usar Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Documentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">47</div>
                    <p className="text-xs text-muted-foreground">+5 este mes</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Vistas Totales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,847</div>
                    <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Colaboradores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">Activos este mes</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Documentos Nuevos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">Último mes</p>
                  </CardContent>
                </Card>
              </div>

              {/* Popular Documents */}
              <Card>
                <CardHeader>
                  <CardTitle>Documentos Más Populares</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDocs.map((doc, index) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{doc.title}</div>
                            <div className="text-sm text-muted-foreground">{doc.category}</div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {doc.views} vistas
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
