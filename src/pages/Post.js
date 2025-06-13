import React from 'react';
import { useParams } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const Post = () => {
  const { id } = useParams();
  const { posts } = useBlog();

  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="text-center text-red-600 mt-20 text-xl font-semibold">
        Post not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={post.authorImage || '/default-avatar.png'}
          alt={post.author}
          className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-700"
        />
        <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">
          {post.title}
        </h1>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        {post.date} • {post.author} • {post.category}
      </div>
      <p className="text-lg text-gray-800 dark:text-gray-200 whitespace-pre-line">
        {post.content}
      </p>
    </div>
  );
};

export default Post;
