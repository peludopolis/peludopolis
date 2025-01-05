import { Post, CreatePostDto, UpdatePostDto, Comment } from './type';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/posts`;
const COMMENT_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/comments`;

export const PostService = {
  async createPost(postData: CreatePostDto): Promise<Post> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
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
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Error updating post');
    }

    return response.json();
  },

  async deletePost(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting post');
    }
  },
};

export const CommentService = {
  async getComments(postId: string): Promise<Comment[]> {
    try {
      console.log('Fetching comments for post:', postId);

      const response = await fetch(`${COMMENT_API_URL}/post/${postId}`);

      if (!response.ok) {
        if (response.status === 404) {
          return []; // No comments found
        }

        if (response.status === 400) {
          return []; // Treat 400 as no comments
        }

        throw new Error(`Error fetching comments: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (!data) return [];

      const commentsArray = Array.isArray(data) ? data : [data];

      return commentsArray.map(comment => ({
        id: comment.id || '',
        author: comment.author || '',
        content: comment.content || '',
        createdAt: comment.createdAt || new Date().toISOString(),
        user: {
          id: comment.userId || comment.user?.id || '',
        },
        post: {
          id: comment.postId || comment.post?.id || '',
        },
      }));
    } catch (error: any) {
      console.error('Error in getComments:', error.message || error);
      return []; // Return an empty array in case of any errors
    }
  },

  

  async createComment(commentData: { content: string; postId: string; userId: string }): Promise<Comment> {
    
    console.log('Datos enviados al backend:', commentData);
    
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

    const data = await response.json();

    return {
      id: data.id,
      author: data.author || '',
      content: data.content,
      createdAt: data.createdAt || new Date().toISOString(),
      user: {
        id: data.userId || data.user?.id,
      },
      post: {
        id: data.postId || data.post?.id,
      },
    };
  },

  deleteComment: async (commentId: string) => {
    try {
      const response = await fetch(`${COMMENT_API_URL}/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el comentario');
      }

      return true;
    } catch (error) {
      console.error('Error en deleteComment:', error);
      throw error;
    }
  }

};

