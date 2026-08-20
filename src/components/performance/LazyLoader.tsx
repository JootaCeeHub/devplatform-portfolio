import { Suspense, lazy, ComponentType, useState, useEffect, useRef } from "react";
import { LoadingSpinner } from "../platform/shared/LoadingSpinner";
import { ErrorBoundary } from "../ErrorBoundary";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface LazyLoaderProps {
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}

// Default loading fallback
const DefaultLoadingFallback = () => (
  <div className="flex items-center justify-center p-8">
    <LoadingSpinner size="lg" />
  </div>
);

// Default error fallback
const DefaultErrorFallback = () => (
  <Card className="m-4">
    <CardContent className="flex items-center justify-center p-8 text-center">
      <div>
        <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
        <p className="text-muted-foreground">Error al cargar el componente</p>
      </div>
    </CardContent>
  </Card>
);

// Generic lazy loader wrapper
export const LazyLoader = ({ 
  fallback = <DefaultLoadingFallback />, 
  errorFallback = <DefaultErrorFallback />,
  children 
}: LazyLoaderProps & { children: React.ReactNode }) => (
  <ErrorBoundary fallback={errorFallback}>
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

// HOC for creating lazy components with loading and error states
export const createLazyComponent = <P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options: LazyLoaderProps = {}
) => {
  const LazyComponent = lazy(importFn);
  
  return (props: P) => (
    <LazyLoader {...options}>
      <LazyComponent {...(props as any)} />
    </LazyLoader>
  );
};

// Pre-configured lazy loaders for common patterns

// Page-level lazy loader with full-screen loading
export const LazyPage = createLazyComponent;

// Component-level lazy loader with minimal loading
export const LazyComponent = (
  importFn: () => Promise<{ default: ComponentType<any> }>,
  loadingText?: string
) => createLazyComponent(
  importFn,
  {
    fallback: (
      <div className="flex items-center justify-center p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <LoadingSpinner size="sm" />
          {loadingText || "Cargando..."}
        </div>
      </div>
    )
  }
);

// Modal/Dialog lazy loader
export const LazyModal = (
  importFn: () => Promise<{ default: ComponentType<any> }>
) => createLazyComponent(
  importFn,
  {
    fallback: (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <div className="flex items-center gap-2">
              <LoadingSpinner />
              <span>Cargando...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
);

// Chart/Heavy component lazy loader
export const LazyChart = (
  importFn: () => Promise<{ default: ComponentType<any> }>
) => createLazyComponent(
  importFn,
  {
    fallback: (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="mx-auto mb-2"><LoadingSpinner /></div>
            <p className="text-sm text-muted-foreground">Cargando gráfico...</p>
          </div>
        </CardContent>
      </Card>
    )
  }
);

// Preload function for better UX
export const preloadComponent = (
  importFn: () => Promise<{ default: ComponentType<any> }>
) => {
  // Start loading the component but don't wait for it
  importFn().catch(err => {
    console.warn('Failed to preload component:', err);
  });
};

// Hook for intersection-based lazy loading
export const useIntersectionLazyLoad = (
  importFn: () => Promise<{ default: ComponentType<any> }>,
  options: IntersectionObserverInit = {}
) => {
  const [Component, setComponent] = useState<ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !Component && !isLoading) {
          setIsLoading(true);
          importFn()
            .then(module => {
              setComponent(() => module.default);
              setIsLoading(false);
            })
            .catch(err => {
              setError(err);
              setIsLoading(false);
            });
        }
      },
      {
        threshold: 0.1,
        ...options
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [importFn, Component, isLoading]);

  return { ref, Component, isLoading, error };
};

// Performance monitoring for lazy loading
export const withLazyLoadingMetrics = <P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  componentName: string
) => {
  return createLazyComponent(async () => {
    const startTime = performance.now();
    
    try {
      const module = await importFn();
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      // Log performance metrics
      console.log(`🚀 Lazy loaded ${componentName} in ${loadTime.toFixed(2)}ms`);
      
      // TODO: Send metrics to analytics service
      // analytics.track('component_lazy_loaded', {
      //   component: componentName,
      //   loadTime,
      //   timestamp: Date.now()
      // });
      
      return module;
    } catch (error) {
      console.error(`❌ Failed to lazy load ${componentName}:`, error);
      
      // TODO: Send error to error tracking service
      // errorTracker.captureException(error, {
      //   component: componentName,
      //   type: 'lazy_loading_error'
      // });
      
      throw error;
    }
  });
};