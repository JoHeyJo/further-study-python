export interface IUser {
  id:number;
  firstName: string;
  lastName: string;
  image: string;
}

export interface IPost {
  title: string | undefined;
  content: string | undefined;
  userId: number;
  firstName: string | null;
  lastName: string | null;
  id: number;
  createdAt: string;
  problem: string;
  solution: string;
}

export interface IPostData extends IPost {
  imageUrl: string | null;
}

export interface IUserId {
  userId: number;
}

export interface UserContextType {
  firstName: string;
  lastName: string;
}

export interface IPosts {
  posts: IPost[];
}

export interface IAlert {
  error: string | null;
}