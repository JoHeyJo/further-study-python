import { createContext } from 'react';

export type ProjectContextType = {
  projectId: number | undefined;
  projectName: string | undefined;
  fetchProjectPosts: () => void;
}

export const ProjectContext = createContext<ProjectContextType>({
  projectId: undefined,
  projectName: undefined,
  fetchProjectPosts: () => {},
});


export type PostContextType = {
  fetchEditPost: (userId: number) => void;
  number?: number
};

export const PostContext = createContext<PostContextType>({
  fetchEditPost: () => {},
  number: undefined
})