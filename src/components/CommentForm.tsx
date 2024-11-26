import { useState } from 'react';

const CommentForm = ({
  onAddComment,
}: {
  onAddComment: (text: string, author: string) => void;
}) => {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text && author) {
      onAddComment(text, author);
      setText('');
      setAuthor('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-600 mb-1">Name</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-gray-600 mb-1">Comment</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
