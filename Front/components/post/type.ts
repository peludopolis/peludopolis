export interface Post {
  createdAt: string;
  id: string;
  description: string;
  image?: string;
  userId: string;
  comments?: Comment[];
}

export interface CreatePostDto {
  description: string;
  image?: string;
  userId: string;
}

export interface UpdatePostDto {
  description?: string;
  image?: string;
}