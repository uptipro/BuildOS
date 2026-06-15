import { RolesProvider } from "../../contexts/RolesContext";
import { ResourceProvider } from "../../contexts/ResourceContext";
import { ProjectSetupPage } from "./ProjectSetupPage";

// Wraps the Project Setup wizard with the context providers it depends on,
// keeping these providers scoped to this route only.
export function ProjectSetupRoute() {
  return (
    <RolesProvider>
      <ResourceProvider>
        <ProjectSetupPage />
      </ResourceProvider>
    </RolesProvider>
  );
}
