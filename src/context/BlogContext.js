// File: src/context/BlogContext.js
import React, { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const BlogContext = createContext();

const defaultPosts = [
  {
    id: uuidv4(),
    title: 'Welcome to SpeakInk Blog',
    content: 'Dive into a world where stories unfold, ideas inspire, and voices are heard. SpeakInk Blog is your space for creativity, reflection, and connection. Whether you are a writer or reader, expect engaging content that sparks thought and emotion. Thank you for being here, let’s write, read, and grow together!',
    author: 'Admin',
    category: 'General',
    date: new Date().toLocaleDateString(),
    authorImage: '/default-avatar.png',
  },
  {
    id: uuidv4(),
    title: 'Echoes of Her Words',
    content: 'She scribbled on torn paper, hiding dreams between lines. Rejected, unread, yet she kept writing. One day, a stranger found her blog and commented, “You changed my life.” Tears fell. Joy bloomed. Her words had finally echoed beyond the silence. From whispers to impact, her voice had found its home.',
    author: 'Chizoba Nkemdilim',
    category: 'Inspiration',
    date: new Date().toLocaleDateString(),
    authorImage: '/default-avatar.png',
  },
  {
    id: uuidv4(),
    title: 'Learning Beyond the Classroom',
    content: 'Education is more than textbooks and exams; it is a lifelong journey of discovery. True learning happens when curiosity leads, when questions spark exploration, and when lessons are drawn from real-life experiences. In today’s world, students need more than facts, they need critical thinking, creativity, and adaptability. Schools should nurture not just minds, but also character, communication, and collaboration skills. At SpeakInk Blog, we believe in holistic education, one that prepares learners for both the test of school and the test of life. Let’s champion learning that empowers, transforms, and lasts a lifetime.',
    author: 'Admin',
    category: 'Education',
    date: new Date().toLocaleDateString(),
    authorImage: '/default-avatar.png',
  },
];

const initialState = JSON.parse(localStorage.getItem('blogPosts')) || defaultPosts;

const reducer = (state, action) => {
  let updatedPosts;
  switch (action.type) {
    case 'CREATE':
      updatedPosts = [
        {
          ...action.payload,
          id: uuidv4(),
          authorImage: action.payload.authorImage || '/default-avatar.png',
        },
        ...state,
      ];
      break;
    case 'UPDATE':
      updatedPosts = state.map(post =>
        post.id === action.payload.id
          ? {
              ...action.payload,
              authorImage: action.payload.authorImage || '/default-avatar.png',
            }
          : post
      );
      break;
    case 'DELETE':
      updatedPosts = state.filter(post => post.id !== action.payload);
      break;
    default:
      return state;
  }
  localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  return updatedPosts;
};

export const BlogProvider = ({ children }) => {
  const [posts, dispatch] = useReducer(reducer, initialState);

  const createPost = (post) => dispatch({ type: 'CREATE', payload: post });
  const updatePost = (post) => dispatch({ type: 'UPDATE', payload: post });
  const deletePost = (id) => dispatch({ type: 'DELETE', payload: id });

  return (
    <BlogContext.Provider value={{ posts, createPost, updatePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
