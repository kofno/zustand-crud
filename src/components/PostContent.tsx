const PostContent = ({ title, body }: { title: string; body: string }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <p className="text-gray-700">{body}</p>
  </div>
);

export default PostContent;
