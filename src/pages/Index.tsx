
import { SidebarProvider } from "@/components/ui/sidebar";
import { DevelopmentPlatform } from "@/components/platform/DevelopmentPlatform";

const Index = () => {
  return (
    <SidebarProvider>
      <DevelopmentPlatform />
    </SidebarProvider>
  );
};

export default Index;
