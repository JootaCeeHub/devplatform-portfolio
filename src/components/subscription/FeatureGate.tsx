import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Lock, 
  Zap, 
  Star, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useAnalytics } from "../analytics/AnalyticsProvider";

// Mock user subscription hook - replace with real Supabase integration
const useSubscription = () => {
  // TODO: Connect to Supabase for real subscription data
  return {
    isSubscribed: false,
    plan: 'free', // 'free', 'pro', 'enterprise'
    features: ['basic_editor', 'public_projects'],
    isLoading: false
  };
};

interface FeatureGateProps {
  feature: string;
  plan: 'pro' | 'enterprise';
  children: ReactNode;
  fallback?: ReactNode;
  showUpgrade?: boolean;
}

const FEATURE_PLANS = {
  // Free features
  'basic_editor': 'free',
  'public_projects': 'free',
  'community_support': 'free',
  
  // Pro features
  'private_projects': 'pro',
  'ai_assistant': 'pro',
  'collaboration': 'pro',
  'advanced_deploy': 'pro',
  'priority_support': 'pro',
  'custom_domains': 'pro',
  'analytics': 'pro',
  
  // Enterprise features
  'unlimited_projects': 'enterprise',
  'team_management': 'enterprise',
  'sso': 'enterprise',
  'audit_logs': 'enterprise',
  'custom_integrations': 'enterprise',
  'dedicated_support': 'enterprise',
  'on_premise': 'enterprise'
};

const PLAN_HIERARCHY = {
  'free': 0,
  'pro': 1,
  'enterprise': 2
};

export const FeatureGate = ({ 
  feature, 
  plan, 
  children, 
  fallback, 
  showUpgrade = true 
}: FeatureGateProps) => {
  const { isSubscribed, plan: userPlan } = useSubscription();
  const { track } = useAnalytics();
  
  const requiredPlanLevel = PLAN_HIERARCHY[plan];
  const userPlanLevel = PLAN_HIERARCHY[userPlan as keyof typeof PLAN_HIERARCHY] || 0;
  const hasAccess = userPlanLevel >= requiredPlanLevel;

  const handleUpgradeClick = () => {
    track('upgrade_clicked', { 
      feature, 
      currentPlan: userPlan, 
      targetPlan: plan,
      location: 'feature_gate'
    });
    
    // TODO: Redirect to pricing or checkout
    window.location.href = '/pricing';
  };

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <Card className="border-dashed border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
          {plan === 'enterprise' ? (
            <Crown className="w-6 h-6 text-primary" />
          ) : (
            <Zap className="w-6 h-6 text-primary" />
          )}
        </div>
        
        <CardTitle className="flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" />
          Funcionalidad {plan === 'enterprise' ? 'Enterprise' : 'Premium'}
        </CardTitle>
        
        <Badge 
          variant="secondary" 
          className={`mx-auto ${
            plan === 'enterprise' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
          }`}
        >
          {plan === 'enterprise' ? 'Enterprise Plan' : 'Pro Plan'}
        </Badge>
      </CardHeader>

      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground">
          {getFeatureDescription(feature, plan)}
        </p>

        {showUpgrade && (
          <div className="space-y-3">
            <Button onClick={handleUpgradeClick} className="w-full">
              <Sparkles className="w-4 h-4 mr-2" />
              Actualizar a {plan === 'enterprise' ? 'Enterprise' : 'Pro'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Desbloquea esta funcionalidad y muchas más
            </p>
          </div>
        )}

        <div className="pt-2">
          <p className="text-xs text-muted-foreground">
            💡 {getUpgradeBenefit(plan)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for wrapping sections that require subscription
export const PremiumSection = ({ 
  children, 
  feature, 
  plan = 'pro',
  title,
  description 
}: {
  children: ReactNode;
  feature: string;
  plan?: 'pro' | 'enterprise';
  title?: string;
  description?: string;
}) => {
  const { isSubscribed, plan: userPlan } = useSubscription();
  const requiredPlanLevel = PLAN_HIERARCHY[plan];
  const userPlanLevel = PLAN_HIERARCHY[userPlan as keyof typeof PLAN_HIERARCHY] || 0;
  const hasAccess = userPlanLevel >= requiredPlanLevel;

  if (!hasAccess) {
    return (
      <div className="relative">
        <div className="blur-sm pointer-events-none">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <FeatureGate feature={feature} plan={plan}>
            {null}
          </FeatureGate>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// Hook for checking feature access
export const useFeatureAccess = (feature: string) => {
  const { plan: userPlan } = useSubscription();
  const requiredPlan = FEATURE_PLANS[feature as keyof typeof FEATURE_PLANS] || 'enterprise';
  const userPlanLevel = PLAN_HIERARCHY[userPlan as keyof typeof PLAN_HIERARCHY] || 0;
  const requiredPlanLevel = PLAN_HIERARCHY[requiredPlan as keyof typeof PLAN_HIERARCHY];
  
  return {
    hasAccess: userPlanLevel >= requiredPlanLevel,
    requiredPlan,
    userPlan
  };
};

// Component for feature announcements/teasers
export const FeatureTeaser = ({ 
  feature, 
  plan = 'pro',
  title,
  description,
  icon: Icon = Zap 
}: {
  feature: string;
  plan?: 'pro' | 'enterprise';
  title: string;
  description: string;
  icon?: any;
}) => {
  const { track } = useAnalytics();

  const handleLearnMore = () => {
    track('feature_teaser_clicked', { feature, plan });
    window.location.href = '/pricing';
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">{title}</h3>
              <Badge 
                variant="secondary" 
                className="text-xs bg-primary/10 text-primary"
              >
                {plan === 'enterprise' ? 'Enterprise' : 'Pro'}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {description}
            </p>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLearnMore}
              className="text-primary border-primary/20 hover:bg-primary/5"
            >
              Saber más
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper functions
const getFeatureDescription = (feature: string, plan: string): string => {
  const descriptions: Record<string, string> = {
    'ai_assistant': 'El AI Assistant te ayuda a escribir código más rápido, detectar errores y optimizar tu código automáticamente.',
    'collaboration': 'Colabora en tiempo real con tu equipo, incluyendo chat en vivo, comentarios en código y video calls.',
    'private_projects': 'Crea proyectos privados para tu trabajo confidencial y proyectos de clientes.',
    'analytics': 'Obtén insights detallados sobre el rendimiento de tus aplicaciones y el uso de la plataforma.',
    'team_management': 'Gestiona permisos de equipo, roles granulares y configuraciones avanzadas de organización.',
    'custom_domains': 'Conecta dominios personalizados para tus aplicaciones deployed.',
    'advanced_deploy': 'Deploy avanzado con múltiples ambientes, rollbacks automáticos y CI/CD configurables.'
  };
  
  return descriptions[feature] || `Esta funcionalidad requiere el plan ${plan}.`;
};

const getUpgradeBenefit = (plan: string): string => {
  if (plan === 'enterprise') {
    return 'Plan Enterprise incluye soporte dedicado 24/7 y características avanzadas de seguridad.';
  }
  return 'Plan Pro incluye todas las funcionalidades para equipos profesionales.';
};