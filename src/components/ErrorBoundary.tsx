import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home, Bug, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorId: ""
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Generate unique error ID for tracking
    const errorId = `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Caught an Error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Component Stack:', errorInfo.componentStack);
      console.groupEnd();
    }

    // TODO: Send error to logging service (Sentry, LogRocket, etc.)
    // logErrorToService(error, errorInfo, this.state.errorId);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportError = () => {
    const { error, errorInfo, errorId } = this.state;
    
    const errorReport = {
      errorId,
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Create mailto link with error details
    const subject = encodeURIComponent(`Error Report - ${errorId}`);
    const body = encodeURIComponent(`
Error ID: ${errorId}
Time: ${errorReport.timestamp}
URL: ${errorReport.url}

Error Message: ${errorReport.message}

Technical Details:
${JSON.stringify(errorReport, null, 2)}

Additional Context:
[Please describe what you were doing when this error occurred]
    `);

    window.open(`mailto:support@devplatform.com?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              
              <CardTitle className="text-2xl text-destructive">
                ¡Oops! Algo salió mal
              </CardTitle>
              
              <p className="text-muted-foreground mt-2">
                Hemos detectado un error inesperado. Nuestro equipo ha sido notificado automáticamente.
              </p>
              
              <Badge variant="secondary" className="mx-auto mt-4">
                Error ID: {this.state.errorId}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Error Details (Development Mode) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="space-y-4">
                  <Separator />
                  
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                    <h3 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                      <Bug className="w-4 h-4" />
                      Detalles del Error (Modo Desarrollo)
                    </h3>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Mensaje:</strong>
                        <p className="text-muted-foreground font-mono bg-muted p-2 rounded mt-1">
                          {this.state.error.message}
                        </p>
                      </div>
                      
                      {this.state.error.stack && (
                        <div>
                          <strong>Stack Trace:</strong>
                          <pre className="text-muted-foreground font-mono text-xs bg-muted p-2 rounded mt-1 overflow-auto max-h-40">
                            {this.state.error.stack}
                          </pre>
                        </div>
                      )}
                      
                      {this.state.errorInfo?.componentStack && (
                        <div>
                          <strong>Component Stack:</strong>
                          <pre className="text-muted-foreground font-mono text-xs bg-muted p-2 rounded mt-1 overflow-auto max-h-40">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Separator />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={this.handleReload} className="flex-1 sm:flex-none">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Recargar Página
                </Button>
                
                <Button variant="outline" onClick={this.handleGoHome} className="flex-1 sm:flex-none">
                  <Home className="w-4 h-4 mr-2" />
                  Ir al Inicio
                </Button>
                
                <Button variant="outline" onClick={this.handleReportError} className="flex-1 sm:flex-none">
                  <Mail className="w-4 h-4 mr-2" />
                  Reportar Error
                </Button>
              </div>

              {/* Help Text */}
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  Si el problema persiste, por favor{" "}
                  <button 
                    onClick={this.handleReportError}
                    className="text-primary hover:underline"
                  >
                    reporta este error
                  </button>
                  {" "}o contacta a{" "}
                  <a 
                    href="mailto:support@devplatform.com" 
                    className="text-primary hover:underline"
                  >
                    support@devplatform.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper component for functional component usage
interface ErrorBoundaryWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorFallback?: ReactNode
) => {
  const ComponentWithErrorBoundary = (props: P) => (
    <ErrorBoundary fallback={errorFallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return ComponentWithErrorBoundary;
};

// Hook for manual error reporting
export const useErrorReporting = () => {
  const reportError = (error: Error, context?: string) => {
    const errorId = `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.error('Manual Error Report:', { error, context, errorId });
    
    // TODO: Send to logging service
    // logErrorToService(error, { context }, errorId);
    
    return errorId;
  };

  return { reportError };
};