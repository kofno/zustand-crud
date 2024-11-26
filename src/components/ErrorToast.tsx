import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

const ErrorToast = ({
  error,
  onDismiss,
}: {
  error: string | null;
  onDismiss: () => void;
}) => {
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => onDismiss(), 5000); // 5 seconds
      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [error, onDismiss]);

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50"
        >
          <p>{error}</p>
          <button
            onClick={onDismiss}
            className="mt-2 text-white underline hover:text-gray-200"
          >
            Dismiss
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorToast;
