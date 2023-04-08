export interface IUser {
  id:number;
  firstName: string;
  lastName: string;
  image: string;
}

export interface IPost {
  title: string;
  content: string;
  id: number;
  firstName: string;
  lastName: string;
  user_id: number;
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