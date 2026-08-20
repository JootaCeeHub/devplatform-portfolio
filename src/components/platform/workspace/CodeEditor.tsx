
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Play,
  Square,
  RotateCcw,
  Save,
  Download,
  Upload,
  Settings,
  GitBranch,
  Bug,
  Terminal,
  FileText,
  Code,
  Palette,
  Monitor,
  Smartphone,
  Tablet,
  Search,
  Replace,
  Zap,
  ExternalLink
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { StatusIndicator } from "../shared/StatusIndicator";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { EmptyState } from "../shared/EmptyState";
import { EditorTabs } from "./code-editor/EditorTabs";
import { FileExplorer } from "./code-editor/FileExplorer";

export const CodeEditor = () => {
  const [activeTab, setActiveTab] = useState("app.tsx");
  const [selectedFile, setSelectedFile] = useState("app.tsx");
  const [code, setCode] = useState(`import React from 'react';
import { Button } from './components/ui/button';

function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-6">Mi Aplicación</h1>
      <Button>Hola Mundo</Button>
    </div>
  );
}

export default App;`);

  const tabs = [
    { id: "app.tsx", name: "App.tsx", language: "typescript", modified: true },
    { id: "button.tsx", name: "Button.tsx", language: "typescript", modified: false },
    { id: "styles.css", name: "styles.css", language: "css", modified: false }
  ];

  const fileStructure = [
    {
      id: "src",
      name: "src",
      type: "folder" as const,
      children: [
        {
          id: "app.tsx",
          name: "App.tsx",
          type: "file" as const,
          language: "typescript"
        },
        {
          id: "components",
          name: "components",
          type: "folder" as const,
          children: [
            {
              id: "button.tsx",
              name: "Button.tsx",
              type: "file" as const,
              language: "typescript"
            }
          ]
        }
      ]
    },
    {
      id: "package.json",
      name: "package.json",
      type: "file" as const,
      language: "json"
    }
  ];

  const handleTabClose = (tabId: string) => {
    console.log("Closing tab:", tabId);
  };

  const handleFileSelect = (file: any) => {
    setSelectedFile(file.id);
    setActiveTab(file.id);
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Editor de Código
            </h1>
            <p className="text-sm text-muted-foreground">Desarrolla y prueba tu aplicación en tiempo real</p>
          </div>
          <StatusIndicator status="running" label="Servidor activo" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <GitBranch className="w-4 h-4 mr-2" />
            main
          </Button>
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </Button>
          <Button size="sm">
            <Play className="w-4 h-4 mr-2" />
            Ejecutar
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-border bg-muted/20">
          <FileExplorer
            files={fileStructure}
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
          />
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          <EditorTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onTabClose={handleTabClose}
          />

          <div className="flex-1 flex">
            {/* Code Editor */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between p-2 border-b border-border bg-muted/20">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">TypeScript</Badge>
                  <Badge variant="outline" className="text-xs">80 líneas</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Search className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Replace className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Settings className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 relative">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="h-full resize-none border-0 font-mono text-sm leading-relaxed"
                  placeholder="Escribe tu código aquí..."
                />
                <div className="absolute bottom-2 right-2">
                  <Badge variant="secondary" className="text-xs">
                    Línea 12, Columna 24
                  </Badge>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-80 border-l border-border">
              <Tabs defaultValue="preview" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-3 bg-muted/50 m-2">
                  <TabsTrigger value="preview" className="text-xs">
                    <Monitor className="w-3 h-3 mr-1" />
                    Vista
                  </TabsTrigger>
                  <TabsTrigger value="console" className="text-xs">
                    <Terminal className="w-3 h-3 mr-1" />
                    Consola
                  </TabsTrigger>
                  <TabsTrigger value="tools" className="text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    Herramientas
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="flex-1 p-2">
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Vista Previa</CardTitle>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Smartphone className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Tablet className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Monitor className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-2">
                      <div className="bg-background border rounded-lg p-4 h-full">
                        <div className="min-h-[200px] flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <h1 className="text-2xl font-bold">Mi Aplicación</h1>
                            <Button>Hola Mundo</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="console" className="flex-1 p-2">
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Consola</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                      <div className="bg-black text-green-400 font-mono text-xs p-3 rounded-lg h-full overflow-auto">
                        <div>$ npm run dev</div>
                        <div className="text-blue-400">[vite] connecting...</div>
                        <div className="text-green-400">[vite] connected.</div>
                        <div>✅ Servidor ejecutándose en http://localhost:5173</div>
                        <div className="text-yellow-400">⚠️ Compilando...</div>
                        <div className="text-green-400">✅ Compilación exitosa</div>
                        <div className="animate-pulse">_</div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tools" className="flex-1 p-2">
                  <div className="space-y-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Herramientas de Depuración</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Bug className="w-4 h-4 mr-2" />
                          Depurador
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FileText className="w-4 h-4 mr-2" />
                          Logs
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Palette className="w-4 h-4 mr-2" />
                          Temas
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Acciones Rápidas</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Download className="w-4 h-4 mr-2" />
                          Descargar
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Upload className="w-4 h-4 mr-2" />
                          Importar
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reiniciar
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
