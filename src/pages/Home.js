// File: src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const Home = () => {
  const { posts } = useBlog();

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-600 dark:text-indigo-400">
        Welcome to SpeakInk Blog
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {posts.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">
            No blog posts available. Check back later!
          </p>
        ) : (
          posts.map(post => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={post.authorImage || '/default-avatar.png'}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700"
                />
                <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                  {post.title}
                </h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {post.date} • {post.author} • {post.category}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {post.content.length > 100
                  ? post.content.slice(0, 100) + '...'
                  : post.content}
              </p>
              <p className="mt-4 text-sm text-blue-600 dark:text-blue-400 font-medium">
                Read more →
              </p>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default Home;
