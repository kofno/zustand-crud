import { useParams } from 'react-router-dom';
import { usePostsStore } from '../stores/usePostsStore';

const PostDetail = () => {
  const { id } = useParams();
  const posts = usePostsStore((state) => state.posts);

  let post;

  if (id) {
    post = posts.find((post) => post.id === id);
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-gray-700 mt-4">{post.body}</p>
    </div>
  );
};

export default PostDetail;
