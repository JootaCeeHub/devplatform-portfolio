import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AnalyticsProvider } from "./components/analytics/AnalyticsProvider";
import { createLazyComponent } from "./components/performance/LazyLoader";

// Lazy load pages for better performance
const Landing = createLazyComponent(() => import("./pages/Landing"));
const Auth = createLazyComponent(() => import("./pages/Auth"));
const Pricing = createLazyComponent(() => import("./pages/Pricing"));
const Index = createLazyComponent(() => import("./pages/Index"));
const NotFound = createLazyComponent(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AnalyticsProvider config={{ debug: true, enableInDevelopment: true }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/platform" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AnalyticsProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
