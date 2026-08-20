
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

interface TemplateCardProps {
  template: {
    name: string;
    description: string;
    category: string;
    icon: string;
  };
}

export const TemplateCard = ({ template }: TemplateCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105">
      <CardHeader className="text-center">
        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
          {template.icon}
        </div>
        <CardTitle className="text-lg">{template.name}</CardTitle>
        <Badge variant="outline" className="mx-auto">{template.category}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 text-center">
          {template.description}
        </p>
        <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Usar Template
        </Button>
      </CardContent>
    </Card>
  );
};
