import { createContext } from 'react';

export type ProjectIdContextType = {
  projectId: number | undefined;
}

export const ProjectIdContext = createContext<ProjectIdContextType>({
  projectId: undefined,
});
