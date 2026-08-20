
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  X, 
  Bot, 
  Send, 
  Sparkles, 
  Code, 
  FileText, 
  Bug,
  Lightbulb,
  Zap,
  MessageCircle,
  Copy,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

interface AIAssistantProps {
  onClose: () => void;
}

export const AIAssistant = ({ onClose }: AIAssistantProps) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickActions = [
    { icon: Code, label: "Generar función", action: "generate-function" },
    { icon: Bug, label: "Debugear código", action: "debug-code" },
    { icon: FileText, label: "Documentar", action: "document-code" },
    { icon: Zap, label: "Optimizar", action: "optimize-code" },
    { icon: Lightbulb, label: "Explicar código", action: "explain-code" },
  ];

  const conversationHistory = [
    {
      id: 1,
      type: "user",
      message: "¿Puedes ayudarme a optimizar esta función de React?",
      timestamp: "10:30"
    },
    {
      id: 2,
      type: "ai",
      message: "¡Por supuesto! Te ayudo a optimizar tu función de React. Primero, déjame ver el código que quieres optimizar. Mientras tanto, aquí tienes algunas técnicas comunes de optimización:\n\n1. **Memoización con useMemo y useCallback**\n2. **Lazy loading de componentes**\n3. **Evitar re-renders innecesarios**\n\n¿Podrías compartir el código específico?",
      timestamp: "10:31",
      suggestions: [
        "Mostrar ejemplo de useMemo",
        "Explicar lazy loading",
        "Ver patrones de optimización"
      ]
    },
    {
      id: 3,
      type: "user",
      message: "Aquí está mi componente:\n\n```jsx\nconst UserList = ({ users }) => {\n  return (\n    <div>\n      {users.map(user => (\n        <div key={user.id}>\n          {user.name} - {user.email}\n        </div>\n      ))}\n    </div>\n  );\n};\n```",
      timestamp: "10:32"
    },
    {
      id: 4,
      type: "ai",
      message: "Excelente! Tu componente está bien estructurado. Aquí hay algunas optimizaciones que puedes aplicar:\n\n```jsx\nimport React, { memo } from 'react';\n\nconst UserItem = memo(({ user }) => (\n  <div className=\"user-item\">\n    {user.name} - {user.email}\n  </div>\n));\n\nconst UserList = memo(({ users }) => {\n  return (\n    <div className=\"user-list\">\n      {users.map(user => (\n        <UserItem key={user.id} user={user} />\n      ))}\n    </div>\n  );\n});\n\nexport default UserList;\n```\n\n**Mejoras aplicadas:**\n• Componente memoizado con `memo()`\n• Subcomponente extraído para mejor rendimiento\n• Clases CSS para mejor mantenibilidad",
      timestamp: "10:33",
      code: true
    }
  ];

  const aiSuggestions = [
    "Crear un hook personalizado para manejo de formularios",
    "Generar tests unitarios para mis componentes",
    "Implementar autenticación con JWT",
    "Optimizar el bundle size de mi aplicación",
    "Crear una API REST con Node.js"
  ];

  const handleSendMessage = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    // Simular respuesta de IA
    setTimeout(() => {
      setIsLoading(false);
      setPrompt("");
    }, 2000);
  };

  const handleQuickAction = (action: string) => {
    const prompts = {
      "generate-function": "Genera una función para...",
      "debug-code": "Ayúdame a debugear este código...",
      "document-code": "Documenta este código...",
      "optimize-code": "Optimiza este código...",
      "explain-code": "Explica cómo funciona este código..."
    };
    setPrompt(prompts[action as keyof typeof prompts] || "");
  };

  return (
    <div className="w-96 bg-background border-l border-border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold">Asistente IA</h2>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="suggestions">Sugerencias</TabsTrigger>
        </TabsList>

        {/* Chat Tab */}
        <TabsContent value="chat" className="flex-1 flex flex-col m-0">
          {/* Quick Actions */}
          <div className="p-4 border-b border-border">
            <h3 className="font-medium mb-3 text-sm">Acciones Rápidas</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action.action}
                  variant="outline"
                  size="sm"
                  className="h-auto p-2 flex flex-col gap-1"
                  onClick={() => handleQuickAction(action.action)}
                >
                  <action.icon className="w-4 h-4" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Conversation */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversationHistory.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
                {message.type === 'ai' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                  <div className={`p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : 'bg-muted'
                  }`}>
                    <div className="text-sm whitespace-pre-wrap">{message.message}</div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    {message.type === 'ai' && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* AI Suggestions */}
                  {message.suggestions && (
                    <div className="mt-2 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="h-auto p-2 text-xs justify-start w-full"
                          onClick={() => setPrompt(suggestion)}
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-medium">U</span>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="animate-pulse flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">Pensando...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Pregunta cualquier cosa sobre código..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                size="sm" 
                onClick={handleSendMessage}
                disabled={isLoading || !prompt.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Suggestions Tab */}
        <TabsContent value="suggestions" className="flex-1 p-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Sugerencias para ti
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {aiSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-auto p-3 text-left"
                    onClick={() => setPrompt(suggestion)}
                  >
                    <div>
                      <div className="text-sm">{suggestion}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Click para empezar
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Capacidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-blue-500" />
                    <span>Generación de código</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bug className="w-4 h-4 text-red-500" />
                    <span>Debugging asistido</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-500" />
                    <span>Documentación automática</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>Optimización de código</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-purple-500" />
                    <span>Explicaciones técnicas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
