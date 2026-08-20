
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Folder,
  FolderOpen,
  FileText,
  FileCode,
  Image,
  Settings,
  ChevronRight,
  ChevronDown,
  Search,
  Plus,
  MoreHorizontal
} from "lucide-react";

interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  language?: string;
}

interface FileExplorerProps {
  files: FileNode[];
  onFileSelect: (file: FileNode) => void;
  selectedFile?: string;
}

export const FileExplorer = ({ files, onFileSelect, selectedFile }: FileExplorerProps) => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["src", "components"]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev =>
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const getFileIcon = (file: FileNode) => {
    if (file.type === "folder") {
      return expandedFolders.includes(file.id) ? FolderOpen : Folder;
    }
    
    switch (file.language) {
      case "typescript":
      case "javascript":
        return FileCode;
      case "json":
        return Settings;
      case "image":
        return Image;
      default:
        return FileText;
    }
  };

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => {
      const Icon = getFileIcon(node);
      const isExpanded = expandedFolders.includes(node.id);
      const isSelected = selectedFile === node.id;

      return (
        <div key={node.id}>
          <div
            className={`flex items-center gap-1 px-2 py-1 hover:bg-muted/50 cursor-pointer group ${
              isSelected ? "bg-primary/10 text-primary" : ""
            }`}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
            onClick={() => {
              if (node.type === "folder") {
                toggleFolder(node.id);
              } else {
                onFileSelect(node);
              }
            }}
          >
            {node.type === "folder" && (
              <div className="w-4 h-4 flex items-center justify-center">
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </div>
            )}
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm flex-1 truncate">{node.name}</span>
            <Button
              variant="ghost"
              size="sm"
              className="w-4 h-4 p-0 opacity-0 group-hover:opacity-100"
            >
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>
          {node.type === "folder" && isExpanded && node.children && (
            <div>
              {renderFileTree(node.children, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm">Explorador</h3>
          <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="Buscar archivos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-7 h-8 text-xs"
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {renderFileTree(files)}
      </div>
    </div>
  );
};
