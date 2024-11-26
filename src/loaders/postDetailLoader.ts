import { LoaderFunctionArgs } from 'react-router-dom';
import { Post } from '../stores/usePostsStore';

export const postDetailLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<Post> => {
  const id = params.id;

  if (!id) {
    throw new Response('Post ID is required', { status: 400 });
  }

  const response = await fetch(`http://localhost:5001/posts/${id}`);
  if (!response.ok) {
    throw new Response('Post not found', { status: 404 });
  }

  return response.json();
};
