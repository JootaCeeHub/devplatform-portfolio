
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

interface ProjectFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

export const ProjectFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedFilter, 
  setSelectedFilter 
}: ProjectFiltersProps) => {
  const filters = [
    { key: "all", label: "Todos" },
    { key: "active", label: "Activos" },
    { key: "planning", label: "Planificación" },
    { key: "completed", label: "Completados" },
    { key: "paused", label: "Pausados" }
  ];

  return (
    <div className="flex items-center gap-4 animate-fade-in">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar proyectos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant={selectedFilter === filter.key ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(filter.key)}
            className="transition-all duration-200 hover:scale-105"
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <Filter className="w-4 h-4" />
        Más filtros
      </Button>
    </div>
  );
};
