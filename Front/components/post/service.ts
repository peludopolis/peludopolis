import { Post, CreatePostDto, UpdatePostDto, Comment } from './type';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/posts';
const COMMENT_API_URL = process.env.NEXT_PUBLIC_API_URL + '/comments';

export const PostService = {
  async createPost(postData: CreatePostDto): Promise<Post> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error('Error creating post');
    }

    return response.json();
  },

  async getPosts(): Promise<Post[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Error fetching posts');
    }

    return response.json();
  },

  async updatePost(id: string, postData: UpdatePostDto): Promise<Post> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error('Error updating post');
    }

    return response.json();
  },

  async deletePost(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Error deleting post');
    }
  }
};

export const CommentService = {
  // Obtener los comentarios de un post
  async getComments(postId: string): Promise<Comment[]> {
    const response = await fetch(`${COMMENT_API_URL}/post/${postId}`);

    if (!response.ok) {
      throw new Error('Error fetching comments');
    }

    const data = await response.json();

    // Mapea la respuesta de la API a la estructura de Comment
    const comments: Comment[] = data.map((comment: any) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt || '', // Asegúrate de manejar el campo createdAt
      user: {
        id: comment.user?.id || '', // Verifica si el campo user está presente
      },
      post: {
        id: comment.post?.id || '', // Verifica si el campo post está presente
      },
    }));

    return comments;
  },

  // Crear un nuevo comentario
  async createComment(commentData: { content: string; postId: string; userId: string }): Promise<Comment> {
    const response = await fetch(COMMENT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error('Error creating comment');
    }

    return response.json();
  },
};

