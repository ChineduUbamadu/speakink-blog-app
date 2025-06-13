import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Dashboard from "./pages/Dashboard";
import CreateEditPost from "./pages/CreateEditPost";
import Layout from "./components/Layout";
import VoiceScreenshot from "./components/VoiceScreenshot";
import { BlogProvider } from "./context/BlogContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BlogProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/post/:id" element={<Layout><Post /></Layout>} />
            <Route path="/admin" element={<Layout><Dashboard /></Layout>} />
            <Route path="/admin/create" element={<Layout><CreateEditPost /></Layout>} />
            <Route path="/admin/edit/:id" element={<Layout><CreateEditPost /></Layout>} />
            <Route
              path="*"
              element={
                <Layout>
                  <div className="p-10 text-center text-xl">
                    404 - Page Not Found
                  </div>
                </Layout>
              }
            />
          </Routes>
          <VoiceScreenshot />
        </Router>
      </BlogProvider>
    </ThemeProvider>
  );
}

export default App;
