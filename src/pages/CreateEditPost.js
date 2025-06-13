// File: src/pages/CreateEditPost.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const CreateEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, createPost, updatePost } = useBlog();

  const editing = Boolean(id);
  const existingPost = posts.find(p => p.id === id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (editing && existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
      setAuthor(existingPost.author);
      setCategory(existingPost.category);
    }
  }, [editing, existingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      id: id || undefined,
      title,
      content,
      author,
      category,
      date: new Date().toLocaleDateString(),
    };
    if (editing) {
      updatePost(post);
    } else {
      createPost(post);
    }
    navigate('/admin');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md mt-10">
      <h2 className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-300 mb-8">
        {editing ? 'Edit Post' : 'Create New Post'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter post title"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-2">Author</label>
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter author's name"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
          <input
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter category (e.g., Tech, Education)"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-2">Content</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="8"
            placeholder="Write your post content here..."
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition duration-200"
          >
            {editing ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditPost;
