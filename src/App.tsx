import PostForm from './components/PostForm';
import PostList from './components/PostList';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          CRUD App with Zustand
        </h1>
        <PostForm />
        <PostList />
      </div>
    </div>
  );
};

export default App;
