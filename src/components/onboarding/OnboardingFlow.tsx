import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Code2, 
  User, 
  Target, 
  Rocket, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Users,
  Building,
  Zap,
  Github,
  Figma,
  Slack
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [userData, setUserData] = useState({
    role: "",
    experience: "",
    teamSize: "",
    goals: "",
    projectType: "",
    integrations: [] as string[],
    companyName: "",
    industry: ""
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const roles = [
    { id: "developer", title: "Desarrollador", icon: Code2, description: "Escribo código y construyo aplicaciones" },
    { id: "designer", title: "Diseñador", icon: Sparkles, description: "Creo interfaces y experiencias de usuario" },
    { id: "product", title: "Product Manager", icon: Target, description: "Gestiono productos y estrategias" },
    { id: "founder", title: "Founder/CTO", icon: Rocket, description: "Lidero equipos técnicos y tomo decisiones" }
  ];

  const experiences = [
    { id: "beginner", title: "Principiante", description: "0-1 años de experiencia" },
    { id: "intermediate", title: "Intermedio", description: "2-5 años de experiencia" },
    { id: "advanced", title: "Avanzado", description: "5+ años de experiencia" },
    { id: "expert", title: "Expert", description: "10+ años, líder técnico" }
  ];

  const teamSizes = [
    { id: "solo", title: "Solo", description: "Trabajo independiente" },
    { id: "small", title: "2-5 personas", description: "Equipo pequeño" },
    { id: "medium", title: "6-20 personas", description: "Equipo mediano" },
    { id: "large", title: "20+ personas", description: "Equipo grande" }
  ];

  const projectTypes = [
    { id: "web", title: "Aplicaciones Web", description: "SPA, PWA, dashboards" },
    { id: "mobile", title: "Apps Móviles", description: "React Native, híbridas" },
    { id: "saas", title: "Productos SaaS", description: "Plataformas de software" },
    { id: "ecommerce", title: "E-commerce", description: "Tiendas online" },
    { id: "portfolio", title: "Portfolios", description: "Sitios personales y corporativos" },
    { id: "startup", title: "Startup MVP", description: "Productos mínimos viables" }
  ];

  const integrations = [
    { id: "github", title: "GitHub", icon: Github },
    { id: "figma", title: "Figma", icon: Figma },
    { id: "slack", title: "Slack", icon: Slack },
    { id: "notion", title: "Notion", icon: Building },
    { id: "discord", title: "Discord", icon: Users },
    { id: "jira", title: "Jira", icon: Target }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    
    try {
      // TODO: Save user preferences to Supabase
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "¡Bienvenido a DevPlatform!",
        description: "Tu espacio de trabajo está listo.",
      });
      
      onComplete();
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al configurar tu cuenta.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleIntegration = (integration: string) => {
    setUserData(prev => ({
      ...prev,
      integrations: prev.integrations.includes(integration)
        ? prev.integrations.filter(i => i !== integration)
        : [...prev.integrations, integration]
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">¡Bienvenido a DevPlatform!</CardTitle>
              <p className="text-muted-foreground">
                Vamos a personalizar tu experiencia. ¿Cuál describe mejor tu rol?
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    userData.role === role.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => setUserData(prev => ({ ...prev, role: role.id }))}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <role.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{role.title}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                    {userData.role === role.id && (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Cuéntanos sobre tu experiencia</CardTitle>
              <p className="text-muted-foreground">
                Esto nos ayuda a personalizar las herramientas y tutoriales para ti
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Nivel de experiencia</Label>
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      userData.experience === exp.id ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                    onClick={() => setUserData(prev => ({ ...prev, experience: exp.id }))}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground">{exp.description}</p>
                      </div>
                      {userData.experience === exp.id && (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Tamaño del equipo</Label>
                {teamSizes.map((size) => (
                  <div
                    key={size.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      userData.teamSize === size.id ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                    onClick={() => setUserData(prev => ({ ...prev, teamSize: size.id }))}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{size.title}</h3>
                        <p className="text-sm text-muted-foreground">{size.description}</p>
                      </div>
                      {userData.teamSize === size.id && (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">¿Qué tipo de proyectos construyes?</CardTitle>
              <p className="text-muted-foreground">
                Configuraremos plantillas y herramientas específicas para tu caso de uso
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Tipo de proyecto principal</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {projectTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        userData.projectType === type.id ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                      onClick={() => setUserData(prev => ({ ...prev, projectType: type.id }))}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{type.title}</h3>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                        {userData.projectType === type.id && (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="goals" className="text-base font-semibold">
                  ¿Cuáles son tus objetivos principales? (Opcional)
                </Label>
                <Textarea
                  id="goals"
                  placeholder="Ej: Lanzar mi startup, mejorar la productividad del equipo, aprender nuevas tecnologías..."
                  value={userData.goals}
                  onChange={(e) => setUserData(prev => ({ ...prev, goals: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-base font-semibold">
                    Empresa (Opcional)
                  </Label>
                  <Input
                    id="company"
                    placeholder="Nombre de tu empresa"
                    value={userData.companyName}
                    onChange={(e) => setUserData(prev => ({ ...prev, companyName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-base font-semibold">
                    Industria (Opcional)
                  </Label>
                  <Input
                    id="industry"
                    placeholder="Ej: Fintech, Healthcare, E-commerce"
                    value={userData.industry}
                    onChange={(e) => setUserData(prev => ({ ...prev, industry: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">¡Casi terminamos!</CardTitle>
              <p className="text-muted-foreground">
                Conecta tus herramientas favoritas para un flujo de trabajo integrado
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  Integraciones (Selecciona las que uses)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {integrations.map((integration) => (
                    <div
                      key={integration.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        userData.integrations.includes(integration.id) 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border'
                      }`}
                      onClick={() => toggleIntegration(integration.id)}
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <integration.icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{integration.title}</span>
                        {userData.integrations.includes(integration.id) && (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="bg-muted/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  ¡Todo listo!
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Tu espacio de trabajo se configurará con:
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Plantillas para {projectTypes.find(p => p.id === userData.projectType)?.title}</li>
                  <li>• Herramientas optimizadas para {teamSizes.find(t => t.id === userData.teamSize)?.title}</li>
                  <li>• Tutoriales de nivel {experiences.find(e => e.id === userData.experience)?.title}</li>
                  <li>• {userData.integrations.length} integraciones configuradas</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">DevPlatform</span>
            </div>
            <Badge variant="secondary">
              Paso {currentStep} de {totalSteps}
            </Badge>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        {renderStep()}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          {currentStep === totalSteps ? (
            <Button
              onClick={handleComplete}
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? "Configurando..." : "¡Comenzar a Desarrollar!"}
              <Rocket className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!userData.role && currentStep === 1}
              size="lg"
            >
              Siguiente
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};