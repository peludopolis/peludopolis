export interface Post {
  user: any;
  id: string;
  description: string;
  image: string;
  userId: string;
  comments: Comment[];  // No permite undefined, siempre es un arreglo
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
}

export interface Comment {
  id: string;  // Agregar la propiedad 'id' aquí
  content: string;
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

