import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';
import { usePostsStore } from '../stores/usePostsStore';

const PostForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const isCreating = usePostsStore((state) => state.isCreating);
  const addPost = usePostsStore((state) => state.addPost);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && body) {
      await addPost({ title, body });
      setTitle('');
      setBody('');
      setIsOpen(false);
    }
  };

  return (
    <div className="mb-6">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-600 transition-all"
      >
        {isOpen ? 'Close Form' : 'Add New Post'}
      </button>

      {/* Collapsible Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-6 space-y-4"
          >
            <h2 className="text-2xl font-semibold text-gray-700">
              Add New Post
            </h2>
            <div>
              <label className="block text-gray-600 mb-1">Title</label>
              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Body</label>
              <textarea
                placeholder="Enter body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className={`w-full text-white font-semibold rounded-md px-4 py-2 transition-all duration-300 transform ${isCreating ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600 hover:scale-105'}`}
              disabled={isCreating}
            >
              {isCreating ? 'Adding...' : 'Add Post'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostForm;
