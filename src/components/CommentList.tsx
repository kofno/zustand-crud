import { AnimatePresence, motion } from 'framer-motion';
import { Comment } from '../stores/usePostsStore';

const CommentList = ({
  comments,
  onDeleteComment,
}: {
  comments: Comment[];
  onDeleteComment: (id: string) => void;
}) => (
  <ul className="space-y-2 mb-4">
    <AnimatePresence>
      {comments.map((comment) => (
        <motion.li
          key={comment.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="border p-4 rounded flex items-start"
        >
          <div className="flex-grow">
            <p className="text-gray-700">{comment.text}</p>
            <p className="text-sm text-gray-500">— {comment.author}</p>
          </div>
          <button
            onClick={() => onDeleteComment(comment.id)}
            className="ml-4 text-red-500 hover:text-red-700 text-sm flex-shrink-0"
          >
            Delete
          </button>
        </motion.li>
      ))}
    </AnimatePresence>
  </ul>
);

export default CommentList;
