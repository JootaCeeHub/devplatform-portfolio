
import { useState } from "react";
import { PlatformSidebar } from "./sidebar/PlatformSidebar";
import { MainWorkspace } from "./workspace/MainWorkspace";
import { CollaborationPanel } from "./collaboration/CollaborationPanel";
import { AIAssistant } from "./ai/AIAssistant";

export const DevelopmentPlatform = () => {
  const [currentView, setCurrentView] = useState<'editor' | 'projects' | 'deploy' | 'docs'>('editor');
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showAI, setShowAI] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background">
      <PlatformSidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        onToggleCollaboration={() => setShowCollaboration(!showCollaboration)}
        onToggleAI={() => setShowAI(!showAI)}
      />
      
      <div className="flex-1 flex">
        <MainWorkspace currentView={currentView} />
        
        {showCollaboration && (
          <CollaborationPanel onClose={() => setShowCollaboration(false)} />
        )}
        
        {showAI && (
          <AIAssistant onClose={() => setShowAI(false)} />
        )}
      </div>
    </div>
  );
};
