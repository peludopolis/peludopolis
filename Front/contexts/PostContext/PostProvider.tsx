"use client";

import { createContext, useContext, ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts as fetchPosts, createPost, updatePost, deletePost } from "../../components/post2/services/posts";
import { CreatePostDto, Post, UpdatePostDto } from "../../components/post2/types/types";

interface PostContextProps {
  posts: Post[];
  createPost: (data: CreatePostDto) => Promise<void>;
  updatePost: (id: string, data: UpdatePostDto) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  refetchPosts: () => void;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  // Fetch posts
  const { data: posts = [], refetch } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // Create a post
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  // Update a post
  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostDto }) => updatePost(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  // Delete a post
  const deletePostMutation = useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const contextValue: PostContextProps = {
    posts,
    createPost: async (data) => {
      await createPostMutation.mutateAsync(data);
    },
    updatePost: async (id, data) => {
      await updatePostMutation.mutateAsync({ id, data });
    },
    deletePost: async (id) => {
      await deletePostMutation.mutateAsync(id);
    },
    refetchPosts: refetch,
  };

  return <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>;
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
