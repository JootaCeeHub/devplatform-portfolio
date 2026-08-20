
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Circle } from "lucide-react";

interface EditorTabsProps {
  tabs: Array<{
    id: string;
    name: string;
    language: string;
    modified: boolean;
  }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

export const EditorTabs = ({ tabs, activeTab, onTabChange, onTabClose }: EditorTabsProps) => {
  const getLanguageColor = (language: string) => {
    switch (language) {
      case "typescript": return "bg-blue-100 text-blue-800";
      case "javascript": return "bg-yellow-100 text-yellow-800";
      case "css": return "bg-purple-100 text-purple-800";
      case "html": return "bg-orange-100 text-orange-800";
      case "json": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex items-center border-b border-border bg-muted/20 overflow-x-auto">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex items-center gap-2 px-4 py-2 cursor-pointer border-r border-border hover:bg-muted/50 transition-colors ${
            activeTab === tab.id ? "bg-background border-b-2 border-b-primary" : ""
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          <div className="flex items-center gap-2">
            <Circle className={`w-2 h-2 ${tab.modified ? "fill-yellow-500 text-yellow-500" : "fill-muted text-muted"}`} />
            <span className="text-sm font-medium">{tab.name}</span>
            <Badge variant="outline" className={`text-xs ${getLanguageColor(tab.language)}`}>
              {tab.language}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-4 h-4 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.id);
            }}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      ))}
    </div>
  );
};
