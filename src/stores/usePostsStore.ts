import { create } from 'zustand';

export interface Post {
  id: string;
  title: string;
  body: string;
}

export interface Comment {
  id: string;
  postId: string;
  text: string;
  author: string;
}

interface PostsStore {
  posts: Post[];
  comments: Comment[];
  isLoading: boolean;
  isCreating: boolean;
  error: string | null;

  fetchPosts: () => Promise<void>;
  addPost: (post: Omit<Post, 'id'>) => Promise<void>;
  updatePost: (id: string, updatedPost: Omit<Post, 'id'>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;

  fetchComments: (postId: string) => Promise<void>;
  addComment: (comment: Omit<Comment, 'id'>) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;

  clearError: () => void;
}

export const usePostsStore = create<PostsStore>((set) => ({
  posts: [],
  comments: [],
  isLoading: false,
  isCreating: false,
  error: null,

  clearError: () => set({ error: null }),

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

  fetchComments: async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/comments?postId=${postId}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      set({ comments: data });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  },

  addComment: async (comment) => {
    try {
      const response = await fetch('http://localhost:5001/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
      });
      if (!response.ok) throw new Error('Failed to add comment');
      const newComment = await response.json();
      set((state) => ({ comments: [...state.comments, newComment] }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  },

  deleteComment: async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/comments/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete comment');
      set((state) => ({
        comments: state.comments.filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  },
}));
