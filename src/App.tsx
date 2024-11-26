import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import { postDetailLoader } from './loaders/postDetailLoader';
import { usePostsStore } from './stores/usePostsStore';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <PostForm />
        <PostList />
      </>
    ),
  },
  {
    path: '/post/:id',
    element: <PostDetail />,
    loader: postDetailLoader,
  },
]);

const App = () => {
  const fetchPosts = usePostsStore((state) => state.fetchPosts);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          CRUD App with Zustand
        </h1>
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
