import { LoaderFunctionArgs, json } from 'react-router-dom';
import { usePostsStore } from '../stores/usePostsStore';

export const postDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;

  if (!id) {
    throw json({ message: 'Post ID is required' }, { status: 400 });
  }

  // Find the post in the store first
  const postsStore = usePostsStore.getState();
  const post = postsStore.posts.find((post) => post.id === id);
  if (post) {
    return post;
  }

  // Fetch the post from the API if not found in the store
  const response = await fetch(`http://localhost:5001/posts/${id}`);
  if (!response.ok) {
    throw json(
      { message: `Post with ID ${id} was not found.` },
      { status: 404 },
    );
  }

  return response.json();
};
