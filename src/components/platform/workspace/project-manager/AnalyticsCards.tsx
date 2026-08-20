
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, Users } from "lucide-react";

interface AnalyticsCardsProps {
  stats: {
    totalProjects: number;
    activeProjects: number;
    totalCommits: number;
    issuesResolved: number;
  };
}

export const AnalyticsCards = ({ stats }: AnalyticsCardsProps) => {
  const cards = [
    {
      title: "Total Proyectos",
      value: stats.totalProjects.toString(),
      description: "+2 este mes",
      icon: Activity,
      trend: "up"
    },
    {
      title: "Proyectos Activos",
      value: stats.activeProjects.toString(),
      description: `${Math.round((stats.activeProjects / stats.totalProjects) * 100)}% del total`,
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "Commits Totales",
      value: stats.totalCommits.toLocaleString(),
      description: "+89 esta semana",
      icon: Activity,
      trend: "up"
    },
    {
      title: "Issues Resueltos",
      value: stats.issuesResolved.toString(),
      description: "92% tasa resolución",
      icon: Users,
      trend: "up"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={card.title} className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {card.trend === "up" ? (
                <TrendingUp className="w-3 h-3 text-green-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-500" />
              )}
              <span>{card.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
