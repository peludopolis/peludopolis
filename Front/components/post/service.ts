import { Post, CreatePostDto, UpdatePostDto } from './type';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/posts';

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