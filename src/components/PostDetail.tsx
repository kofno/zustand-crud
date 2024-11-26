import { Link, useLoaderData } from 'react-router-dom';
import { Post } from '../stores/usePostsStore';

const PostDetail = () => {
  const post = useLoaderData() as Post;

  return (
    <div>
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-gray-700 mt-4">{post.body}</p>
      <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">
        Back to Posts
      </Link>
    </div>
  );
};

export default PostDetail;
