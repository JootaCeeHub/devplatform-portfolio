
import { CheckCircle, XCircle, Clock, AlertTriangle, RefreshCw } from "lucide-react";

interface StatusIndicatorProps {
  status: "success" | "error" | "warning" | "pending" | "loading" | "running";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  label?: string;
}

export const StatusIndicator = ({ status, size = "md", showText = false, label }: StatusIndicatorProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          icon: CheckCircle,
          color: "text-green-500",
          text: "Exitoso"
        };
      case "error":
        return {
          icon: XCircle,
          color: "text-red-500",
          text: "Error"
        };
      case "warning":
        return {
          icon: AlertTriangle,
          color: "text-yellow-500",
          text: "Advertencia"
        };
      case "pending":
        return {
          icon: Clock,
          color: "text-gray-500",
          text: "Pendiente"
        };
      case "loading":
        return {
          icon: RefreshCw,
          color: "text-blue-500 animate-spin",
          text: "Cargando"
        };
      case "running":
        return {
          icon: CheckCircle,
          color: "text-green-500",
          text: "Ejecutándose"
        };
      default:
        return {
          icon: Clock,
          color: "text-gray-500",
          text: "Desconocido"
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <div className="flex items-center gap-2">
      <Icon className={`${sizeClasses[size]} ${config.color}`} />
      {(showText || label) && (
        <span className={`text-sm ${config.color.replace('animate-spin', '')}`}>
          {label || config.text}
        </span>
      )}
    </div>
  );
};
