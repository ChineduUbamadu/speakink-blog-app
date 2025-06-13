// File: src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const Dashboard = () => {
  const { posts, deletePost } = useBlog();

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      deletePost(id);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Link
        to="/admin/create"
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Create New Post
      </Link>
      <div className="space-y-4 mt-4">
        {posts.map(post => (
          <div key={post.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-2">
              By {post.author || 'Anonymous'} | {post.category || 'General'} | {post.date}
            </p>
            <p>{post.content.substring(0, 100)}...</p>
            <div className="mt-2 flex gap-3">
              <Link to={`/admin/edit/${post.id}`} className="text-green-600 hover:underline">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
