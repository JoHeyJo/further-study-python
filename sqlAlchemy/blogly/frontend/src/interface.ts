export interface IUser {
  id:number;
  firstName: string;
  lastName: string;
  image: string;
}

export interface IPost {
  title: string;
  content: string;
  userId: number;
  firstName: string;
  lastName: string;
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