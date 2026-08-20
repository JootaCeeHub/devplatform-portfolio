
import { CodeEditor } from "./CodeEditor";
import { ProjectManager } from "./ProjectManager";
import { DeploymentPanel } from "./DeploymentPanel";
import { DocumentationPanel } from "./DocumentationPanel";

interface MainWorkspaceProps {
  currentView: 'editor' | 'projects' | 'deploy' | 'docs';
}

export const MainWorkspace = ({ currentView }: MainWorkspaceProps) => {
  const renderCurrentView = () => {
    switch (currentView) {
      case 'editor':
        return <CodeEditor />;
      case 'projects':
        return <ProjectManager />;
      case 'deploy':
        return <DeploymentPanel />;
      case 'docs':
        return <DocumentationPanel />;
      default:
        return <CodeEditor />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {renderCurrentView()}
    </div>
  );
};
