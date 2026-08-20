import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Code2, 
  Rocket, 
  Users, 
  Bot, 
  Star, 
  Check, 
  ArrowRight,
  Github,
  Zap,
  Shield,
  Globe,
  Play,
  ChevronRight,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Connect to Supabase for lead storage
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "¡Gracias por tu interés!",
        description: "Te contactaremos pronto con acceso early access.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Code2,
      title: "Editor Colaborativo",
      description: "Código en tiempo real con tu equipo, syntax highlighting y autocompletado inteligente."
    },
    {
      icon: Rocket,
      title: "Deploy Instantáneo",
      description: "Despliega tu aplicación con un click. CI/CD automático y múltiples ambientes."
    },
    {
      icon: Bot,
      title: "IA Integrada",
      description: "Asistente de código inteligente que acelera tu desarrollo y detecta errores."
    },
    {
      icon: Users,
      title: "Colaboración Avanzada",
      description: "Chat en vivo, video calls, comentarios en código y revisiones en tiempo real."
    },
    {
      icon: Shield,
      title: "Seguridad Enterprise",
      description: "Autenticación segura, roles granulares y cumplimiento de estándares."
    },
    {
      icon: Globe,
      title: "Global CDN",
      description: "Distribución mundial con latencia ultra-baja y 99.9% uptime garantizado."
    }
  ];

  const testimonials = [
    {
      name: "María González",
      role: "CTO, TechStartup",
      content: "DevPlatform revolucionó nuestro flujo de desarrollo. Reducimos el time-to-market en 60%.",
      rating: 5
    },
    {
      name: "Carlos Mendez",
      role: "Lead Developer, InnovateLab",
      content: "La colaboración en tiempo real es increíble. Es como tener Google Docs pero para código.",
      rating: 5
    },
    {
      name: "Ana Torres",
      role: "Founder, WebAgency",
      content: "El deploy automático me ahorra horas semanales. Mi equipo es mucho más productivo.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Gratis",
      period: "para siempre",
      description: "Perfecto para proyectos personales",
      features: [
        "1 proyecto activo",
        "2 colaboradores",
        "5GB de almacenamiento",
        "Deploy básico",
        "Soporte por email"
      ],
      cta: "Comenzar Gratis",
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      period: "/mes",
      description: "Ideal para equipos pequeños",
      features: [
        "10 proyectos activos",
        "10 colaboradores",
        "100GB de almacenamiento",
        "Deploy avanzado + CI/CD",
        "IA Assistant incluido",
        "Video calls ilimitadas",
        "Soporte prioritario"
      ],
      cta: "Prueba 14 días gratis",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/mes",
      description: "Para organizaciones grandes",
      features: [
        "Proyectos ilimitados",
        "Colaboradores ilimitados",
        "1TB de almacenamiento",
        "Deploy enterprise + multi-region",
        "IA Premium + custom models",
        "SSO y compliance",
        "Custom integrations",
        "Soporte 24/7 dedicado"
      ],
      cta: "Contactar Ventas",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                DevPlatform
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Características
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Precios
              </a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                Testimonios
              </a>
              <Button variant="outline" size="sm">
                Iniciar Sesión
              </Button>
              <Button size="sm">
                Prueba Gratis
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6">
              🚀 Nuevo: IA Assistant con GPT-4 integrado
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              La plataforma de desarrollo{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                colaborativo
              </span>{" "}
              del futuro
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Acelera tu desarrollo con IA, colabora en tiempo real y despliega instantáneamente. 
              Todo lo que necesitas para crear aplicaciones increíbles.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8">
                <Play className="w-5 h-5 mr-2" />
                Comenzar Gratis
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Github className="w-5 h-5 mr-2" />
                Ver Demo
              </Button>
            </div>

            {/* Lead Capture Form */}
            <Card className="max-w-md mx-auto bg-card/50 backdrop-blur">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Acceso Early Access</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLeadCapture} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="text-center"
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Enviando..." : "Únete a la lista VIP"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Sé el primero en probar las nuevas características
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Todo lo que necesitas para desarrollar
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Herramientas profesionales que se integran perfectamente para acelerar tu workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Planes que escalan contigo
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Desde proyectos personales hasta equipos enterprise. Encuentra el plan perfecto.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative hover:shadow-lg transition-all ${
                  plan.popular ? 'border-primary shadow-lg scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    Más Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1 mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full mt-6 ${plan.popular ? '' : 'variant-outline'}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Miles de desarrolladores confían en DevPlatform para sus proyectos más importantes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            ¿Listo para revolucionar tu desarrollo?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Únete a miles de desarrolladores que ya están construyendo el futuro con DevPlatform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Comenzar Gratis Ahora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Hablar con Ventas
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/20 border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-primary-foreground" />
                </div>
                <h1 className="font-bold text-xl">DevPlatform</h1>
              </div>
              <p className="text-muted-foreground mb-4">
                La plataforma de desarrollo colaborativo que acelera la innovación.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                contacto@devplatform.com
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integraciones</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentación</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Tutoriales</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Comunidad</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Acerca de</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacidad</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-muted-foreground text-sm">
              © 2024 DevPlatform. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;