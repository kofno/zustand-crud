import { create } from 'zustand';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsStore {
  posts: Post[];
  isLoading: boolean;
  isCreating: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (post: Omit<Post, 'id'>) => Promise<void>;
  updatePost: (id: number, updatedPost: Omit<Post, 'id'>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

export const usePostsStore = create<PostsStore>((set) => ({
  posts: [],
  isLoading: false,
  isCreating: false,
  error: null,

  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://localhost:5001/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      set({ posts: data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },

  addPost: async (post) => {
    set({ isCreating: true, error: null });
    try {
      const response = await fetch('http://localhost:5001/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error('Failed to add post');
      }
      const data = await response.json();
      set((state) => ({ posts: [...state.posts, data], isCreating: false }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isCreating: false,
      });
    }
  },

  updatePost: async (id, updatedPost) => {
    try {
      const response = await fetch(`http://localhost:5001/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
      const data = await response.json();
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, ...data } : post,
        ),
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  },

  deletePost: async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/posts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  },
}));
