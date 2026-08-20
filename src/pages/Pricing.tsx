import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Check, 
  Crown, 
  Zap, 
  Users, 
  Code2, 
  Shield, 
  Rocket,
  Star,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { toast } = useToast();

  const plans = [
    {
      name: "Starter",
      description: "Perfecto para desarrolladores individuales",
      price: { monthly: 0, annual: 0 },
      badge: "Gratis",
      icon: Code2,
      features: [
        "1 proyecto activo",
        "2 colaboradores",
        "5GB de almacenamiento",
        "Deploy básico",
        "Plantillas básicas",
        "Soporte por email",
        "Comunidad de desarrolladores"
      ],
      limitations: [
        "Sin proyectos privados",
        "Sin IA Assistant",
        "Sin colaboración en tiempo real"
      ],
      cta: "Comenzar Gratis",
      popular: false,
      color: "border-border"
    },
    {
      name: "Professional",
      description: "Ideal para equipos y freelancers",
      price: { monthly: 29, annual: 25 },
      badge: "Más Popular",
      icon: Zap,
      features: [
        "10 proyectos activos",
        "10 colaboradores",
        "100GB de almacenamiento", 
        "Deploy avanzado + CI/CD",
        "IA Assistant incluido",
        "Colaboración en tiempo real",
        "Video calls ilimitadas",
        "Proyectos privados",
        "Dominios personalizados",
        "Analytics avanzados",
        "Soporte prioritario",
        "Plantillas premium"
      ],
      limitations: [],
      cta: "Probar 14 días gratis",
      popular: true,
      color: "border-primary"
    },
    {
      name: "Enterprise",
      description: "Para organizaciones que escalan",
      price: { monthly: 99, annual: 83 },
      badge: "Enterprise",
      icon: Crown,
      features: [
        "Proyectos ilimitados",
        "Colaboradores ilimitados",
        "1TB de almacenamiento",
        "Deploy enterprise + multi-región",
        "IA Premium + modelos personalizados",
        "SSO y autenticación avanzada",
        "Gestión de equipos y roles",
        "Audit logs y compliance",
        "Integraciones personalizadas",
        "API dedicada",
        "Soporte 24/7 dedicado",
        "Training y onboarding",
        "SLA 99.9% uptime"
      ],
      limitations: [],
      cta: "Contactar Ventas",
      popular: false,
      color: "border-purple-500"
    }
  ];

  const handleSubscribe = (planName: string) => {
    // TODO: Integrate with Stripe
    toast({
      title: `Plan ${planName} seleccionado`,
      description: "Redirigiendo al checkout...",
    });
  };

  const faq = [
    {
      q: "¿Puedo cambiar de plan en cualquier momento?",
      a: "Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se reflejan inmediatamente y la facturación se prorratea."
    },
    {
      q: "¿Qué incluye la prueba gratuita?",
      a: "La prueba gratuita de 14 días incluye todas las funcionalidades del plan Professional, sin restricciones."
    },
    {
      q: "¿Hay descuentos para estudiantes?",
      a: "Sí, ofrecemos un 50% de descuento en todos los planes pagos para estudiantes verificados."
    },
    {
      q: "¿Puedo cancelar mi suscripción?",
      a: "Puedes cancelar tu suscripción en cualquier momento desde tu panel de control. No hay penalizaciones ni compromisos a largo plazo."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">DevPlatform</span>
            </Link>
            <Link to="/auth">
              <Button>Iniciar Sesión</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Planes que escalan contigo
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Desde proyectos personales hasta equipos enterprise. 
            Elige el plan perfecto para tu nivel de desarrollo.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${!isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
              Mensual
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className={`text-sm ${isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
              Anual
            </span>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Ahorra 20%
            </Badge>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative hover:shadow-lg transition-all ${plan.color} ${
                  plan.popular ? 'shadow-lg scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                    {plan.badge}
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <plan.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center gap-1 mt-6">
                    <span className="text-4xl font-bold">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-muted-foreground">
                        /{isAnnual ? 'año' : 'mes'}
                      </span>
                    )}
                  </div>
                  
                  {isAnnual && plan.price.monthly > 0 && (
                    <p className="text-sm text-green-600">
                      Ahorra ${(plan.price.monthly * 12) - (plan.price.annual * 12)} al año
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${plan.popular ? '' : 'variant-outline'}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handleSubscribe(plan.name)}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {plan.name === 'Starter' && (
                    <p className="text-xs text-center text-muted-foreground">
                      Sin tarjeta de crédito requerida
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Preguntas Frecuentes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faq.map((item, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold">{item.q}</h3>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;