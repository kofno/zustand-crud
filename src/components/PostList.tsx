import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePostsStore } from '../stores/usePostsStore';
import Spinner from './Spinner';

const PostList = () => {
  const posts = usePostsStore((state) => state.posts);
  const commentCounts = usePostsStore((state) => state.commentCounts);
  const isLoading = usePostsStore((state) => state.isLoading);
  const deletePost = usePostsStore((state) => state.deletePost);
  const fetchAllComments = usePostsStore((state) => state.fetchAllComments);

  useEffect(() => {
    fetchAllComments();
  }, [fetchAllComments]);

  if (isLoading) {
    return <Spinner />;
  }

  if (posts.length === 0) {
    return (
      <p className="text-gray-500 text-center">
        No posts available. Add some posts above.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Posts</h2>
      <ul className="space-y-4">
        <AnimatePresence>
          {posts.map((post) => (
            <motion.li
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    <Link
                      to={`/post/${post.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mt-1">{post.body}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {commentCounts[post.id] || 0} comments
                  </p>
                </div>
                <button
                  onClick={() => deletePost(post.id)}
                  className="bg-red-500 text-white rounded-md px-3 py-1 hover:bg-red-600 transition-all focus:ring focus:ring-red-300"
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default PostList;
