import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'motion/react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();

  let title = 'Unexpected Error';
  let message = 'Something went wrong.';

  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status}`;
    message = error.data?.message || error.statusText;
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md text-center">
        <ExclamationCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-red-600 mb-4">{title}</h1>
        <p className="text-gray-700 mb-4">{message}</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default ErrorBoundary;
