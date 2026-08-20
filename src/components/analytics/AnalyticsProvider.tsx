import { createContext, useContext, useEffect, ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";

// TypeScript declarations for global analytics objects
declare global {
  function gtag(...args: any[]): void;
  const mixpanel: {
    track: (event: string, properties?: any) => void;
    track_pageview: (properties?: any) => void;
    identify: (userId: string) => void;
    people: {
      set: (properties: any) => void;
    };
  };
}

// Analytics event types
interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

interface UserProperties {
  userId?: string;
  email?: string;
  role?: string;
  plan?: string;
  signupDate?: string;
}

interface AnalyticsContextType {
  track: (eventName: string, properties?: Record<string, any>) => void;
  page: (pageName?: string, properties?: Record<string, any>) => void;
  identify: (userId: string, properties?: UserProperties) => void;
  setUserProperties: (properties: UserProperties) => void;
  isInitialized: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: ReactNode;
  config?: {
    debug?: boolean;
    enableInDevelopment?: boolean;
  };
}

export const AnalyticsProvider = ({ 
  children, 
  config = { debug: false, enableInDevelopment: false } 
}: AnalyticsProviderProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [userProperties, setUserPropertiesState] = useState<UserProperties>({});
  const location = useLocation();

  const isDevelopment = process.env.NODE_ENV === 'development';
  const shouldTrack = !isDevelopment || config.enableInDevelopment;

  useEffect(() => {
    // Initialize analytics services
    initializeAnalytics();
  }, []);

  // Track page views automatically
  useEffect(() => {
    if (isInitialized) {
      page(location.pathname);
    }
  }, [location.pathname, isInitialized]);

  const initializeAnalytics = async () => {
    try {
      // TODO: Initialize analytics services (Google Analytics, Mixpanel, etc.)
      // Example:
      // await loadGoogleAnalytics();
      // await loadMixpanel();
      // await loadHotjar();
      
      if (config.debug) {
        console.log('📊 Analytics initialized');
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
    }
  };

  const track = (eventName: string, properties: Record<string, any> = {}) => {
    if (!shouldTrack) return;

    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        ...properties,
        ...userProperties,
        url: window.location.href,
        referrer: document.referrer,
        timestamp: Date.now()
      },
      timestamp: Date.now()
    };

    if (config.debug) {
      console.log('📊 Track Event:', event);
    }

    // Send to analytics services
    sendToAnalyticsServices('track', event);
    
    // Store in local storage for offline support
    storeEventLocally(event);
  };

  const page = (pageName?: string, properties: Record<string, any> = {}) => {
    if (!shouldTrack) return;

    const pageEvent = {
      name: 'page_view',
      properties: {
        page: pageName || location.pathname,
        title: document.title,
        ...properties,
        ...userProperties,
        timestamp: Date.now()
      }
    };

    if (config.debug) {
      console.log('📊 Page View:', pageEvent);
    }

    sendToAnalyticsServices('page', pageEvent);
    storeEventLocally(pageEvent);
  };

  const identify = (userId: string, properties: UserProperties = {}) => {
    if (!shouldTrack) return;

    const identifyData = {
      userId,
      properties: {
        ...properties,
        lastSeen: new Date().toISOString()
      }
    };

    setUserPropertiesState(prev => ({
      ...prev,
      userId,
      ...properties
    }));

    if (config.debug) {
      console.log('📊 Identify User:', identifyData);
    }

    sendToAnalyticsServices('identify', identifyData);
  };

  const setUserProperties = (properties: UserProperties) => {
    setUserPropertiesState(prev => ({
      ...prev,
      ...properties
    }));

    if (config.debug) {
      console.log('📊 Set User Properties:', properties);
    }

    sendToAnalyticsServices('setUserProperties', properties);
  };

  const sendToAnalyticsServices = (type: string, data: any) => {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      switch (type) {
        case 'track':
          gtag('event', data.name, data.properties);
          break;
        case 'page':
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: data.properties.title,
            page_location: window.location.href
          });
          break;
        case 'identify':
          gtag('config', 'GA_MEASUREMENT_ID', {
            user_id: data.userId
          });
          break;
      }
    }

    // Mixpanel
    if (typeof mixpanel !== 'undefined') {
      switch (type) {
        case 'track':
          mixpanel.track(data.name, data.properties);
          break;
        case 'page':
          mixpanel.track_pageview(data.properties);
          break;
        case 'identify':
          mixpanel.identify(data.userId);
          mixpanel.people.set(data.properties);
          break;
        case 'setUserProperties':
          mixpanel.people.set(data);
          break;
      }
    }

    // Custom analytics endpoint
    // TODO: Send to your backend analytics service
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ type, data })
    // });
  };

  const storeEventLocally = (event: AnalyticsEvent) => {
    try {
      const storedEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      storedEvents.push(event);
      
      // Keep only last 100 events
      if (storedEvents.length > 100) {
        storedEvents.splice(0, storedEvents.length - 100);
      }
      
      localStorage.setItem('analytics_events', JSON.stringify(storedEvents));
    } catch (error) {
      console.warn('Failed to store analytics event locally:', error);
    }
  };

  const value: AnalyticsContextType = {
    track,
    page,
    identify,
    setUserProperties,
    isInitialized
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

// Pre-built tracking hooks for common events
export const useTrackPageView = (pageName?: string, properties?: Record<string, any>) => {
  const { page } = useAnalytics();
  
  useEffect(() => {
    page(pageName, properties);
  }, [pageName, page]);
};

export const useTrackUserAction = () => {
  const { track } = useAnalytics();
  
  return (action: string, properties?: Record<string, any>) => {
    track(`user_${action}`, properties);
  };
};

// Conversion tracking
export const useConversionTracking = () => {
  const { track, setUserProperties } = useAnalytics();
  
  const trackSignup = (method: string, plan?: string) => {
    track('user_signup', { method, plan });
    setUserProperties({ signupDate: new Date().toISOString() });
  };
  
  const trackUpgrade = (fromPlan: string, toPlan: string) => {
    track('user_upgrade', { fromPlan, toPlan });
    setUserProperties({ plan: toPlan });
  };
  
  const trackFeatureUsed = (feature: string, context?: string) => {
    track('feature_used', { feature, context });
  };
  
  const trackProjectCreated = (projectType: string, template?: string) => {
    track('project_created', { projectType, template });
  };
  
  const trackDeployment = (success: boolean, environment?: string) => {
    track('deployment', { success, environment });
  };

  return {
    trackSignup,
    trackUpgrade,
    trackFeatureUsed,
    trackProjectCreated,
    trackDeployment
  };
};

// Performance tracking
export const usePerformanceTracking = () => {
  const { track } = useAnalytics();
  
  const trackPageLoad = (pageName: string, loadTime: number) => {
    track('page_load_time', { pageName, loadTime });
  };
  
  const trackApiCall = (endpoint: string, duration: number, success: boolean) => {
    track('api_call', { endpoint, duration, success });
  };
  
  const trackError = (errorType: string, errorMessage: string, context?: string) => {
    track('error_occurred', { errorType, errorMessage, context });
  };

  return {
    trackPageLoad,
    trackApiCall,
    trackError
  };
};
