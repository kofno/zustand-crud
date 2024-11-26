import { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { Post, usePostsStore } from '../stores/usePostsStore';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import ErrorToast from './ErrorToast';
import PostContent from './PostContent';

const PostDetail = () => {
  const post = useLoaderData() as Post;

  const comments = usePostsStore((state) => state.comments);
  const fetchComments = usePostsStore((state) => state.fetchComments);
  const addComment = usePostsStore((state) => state.addComment);
  const deleteComment = usePostsStore((state) => state.deleteComment);

  const error = usePostsStore((state) => state.error);
  const clearError = usePostsStore((state) => state.clearError);

  useEffect(() => {
    fetchComments(post.id);
  }, [fetchComments, post.id]);

  return (
    <div>
      <PostContent title={post.title} body={post.body} />
      <ErrorToast error={error} onDismiss={clearError} />
      <CommentList comments={comments} onDeleteComment={deleteComment} />
      <h3 className="text-xl font-semibold mb-2">
        Comments ({comments.length})
      </h3>
      <CommentForm
        onAddComment={(text, author) =>
          addComment({ postId: post.id, text, author })
        }
      />
      <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">
        Back to Posts
      </Link>
    </div>
  );
};

export default PostDetail;
