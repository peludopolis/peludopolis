export interface Post {
  createdAt: string | number | Date;
  id: string;
  title: string;
  description: string;
  image?: string;
  author: string;
  userId: string;
  created_at: string;
  comments?: Comment[];
}

export interface User {
  id: string;
  username: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  user: { id: string };
  post: { id: string };
}

export interface CreatePostDto {
  title: string;
  description: string;
  image?: string;
  userId: string;
  author: string;
  created_at: string;
}

export interface UpdatePostDto {
  title?: string;
  description?: string;
  image?: string;
}
