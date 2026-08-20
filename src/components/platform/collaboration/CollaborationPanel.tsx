
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  X, 
  Users, 
  MessageCircle, 
  Video, 
  Phone,
  Send,
  Mic,
  MicOff,
  VideoIcon,
  VideoOff,
  Share,
  Settings
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CollaborationPanelProps {
  onClose: () => void;
}

export const CollaborationPanel = ({ onClose }: CollaborationPanelProps) => {
  const [message, setMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  const activeUsers = [
    { id: 1, name: "Alice Johnson", status: "online", avatar: "AJ", color: "bg-blue-500" },
    { id: 2, name: "Bob Smith", status: "online", avatar: "BS", color: "bg-green-500" },
    { id: 3, name: "Charlie Brown", status: "away", avatar: "CB", color: "bg-yellow-500" },
    { id: 4, name: "Diana Prince", status: "online", avatar: "DP", color: "bg-purple-500" },
  ];

  const chatMessages = [
    {
      id: 1,
      user: "Alice Johnson",
      message: "¿Alguien puede revisar el componente de login?",
      time: "10:30",
      avatar: "AJ"
    },
    {
      id: 2,
      user: "Bob Smith",
      message: "Claro, lo reviso ahora. ¿Hay algún issue específico?",
      time: "10:32",
      avatar: "BS"
    },
    {
      id: 3,
      user: "Charlie Brown",
      message: "Encontré un bug en la validación de formularios",
      time: "10:35",
      avatar: "CB"
    },
    {
      id: 4,
      user: "Alice Johnson",
      message: "Perfecto, creé un branch para arreglarlo",
      time: "10:38",
      avatar: "AJ"
    }
  ];

  const recentActivity = [
    { user: "Alice", action: "editó", file: "app.tsx", time: "2 min" },
    { user: "Bob", action: "comentó en", file: "utils.ts", time: "5 min" },
    { user: "Charlie", action: "creó branch", file: "feature/new-ui", time: "10 min" },
    { user: "Diana", action: "hizo commit", file: "fix: authentication", time: "15 min" },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Aquí se enviaría el mensaje
      setMessage("");
    }
  };

  return (
    <div className="w-80 bg-background border-l border-border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <h2 className="font-semibold">Colaboración</h2>
          <Badge variant="secondary">{activeUsers.length}</Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Active Users */}
      <div className="p-4 border-b border-border">
        <h3 className="font-medium mb-3">Usuarios Activos</h3>
        <div className="space-y-2">
          {activeUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-3">
              <div className="relative">
                <Avatar className={`w-8 h-8 ${user.color}`}>
                  <AvatarFallback className="text-white text-xs">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                  user.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{user.name}</div>
                <div className="text-xs text-muted-foreground capitalize">{user.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Call Controls */}
      <div className="p-4 border-b border-border">
        <h3 className="font-medium mb-3">Llamada</h3>
        <div className="flex gap-2">
          <Button 
            variant={isMuted ? "destructive" : "outline"} 
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Button 
            variant={isVideoOn ? "default" : "outline"} 
            size="sm"
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            {isVideoOn ? <VideoIcon className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4" />
          </Button>
          <Button variant="destructive" size="sm">
            <Phone className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 p-4 border-b border-border">
          <MessageCircle className="w-4 h-4" />
          <h3 className="font-medium">Chat del Equipo</h3>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="flex gap-2">
              <Avatar className="w-6 h-6 bg-primary">
                <AvatarFallback className="text-white text-xs">
                  {msg.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium">{msg.user}</span>
                  <span className="text-muted-foreground">{msg.time}</span>
                </div>
                <div className="text-sm mt-1">{msg.message}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button size="sm" onClick={handleSendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="border-t border-border">
        <div className="p-4">
          <h3 className="font-medium mb-3">Actividad Reciente</h3>
          <div className="space-y-2">
            {recentActivity.map((activity, index) => (
              <div key={index} className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{activity.user}</span>
                {' '}{activity.action}{' '}
                <span className="font-medium text-foreground">{activity.file}</span>
                {' '}hace {activity.time}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
