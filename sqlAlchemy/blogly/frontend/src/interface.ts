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
}

export interface IPostData extends IPost {
  id: number;
  firstName: string;
  lastName: string;
  created_at: string;
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