import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import PostCard from './components/PostCard';
import NewPostForm from './components/NewPostForm';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const backend = import.meta.env.VITE_BACKEND_URL || '';

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${backend}/api/posts?limit=20`);
      if (!res.ok) throw new Error('Failed to load posts');
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-white">
      <Hero />

      <main className="relative z-10 max-w-5xl mx-auto px-6 -mt-10">
        {/* Floating container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/60 shadow-xl p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent">Latest stories</h2>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence>
              {posts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </AnimatePresence>
            {!loading && posts.length === 0 && (
              <p className="text-purple-800/70">No posts yet. Be the first to share a memory below.</p>
            )}
          </div>
        </motion.div>

        <div className="h-8" />

        <NewPostForm onCreated={fetchPosts} />

        <div className="h-16" />
      </main>

      <footer className="text-center text-sm text-purple-700/60 py-10">
        Made with love for Mom 026
      </footer>
    </div>
  );
}

export default App
