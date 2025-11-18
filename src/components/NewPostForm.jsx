import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewPostForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const backend = import.meta.env.VITE_BACKEND_URL || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !content.trim()) {
      setError('Please add a title and a little story.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${backend}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, author: 'Mom', tags: [] }),
      });
      if (!res.ok) throw new Error('Could not save the post.');
      await res.json();
      setTitle('');
      setContent('');
      onCreated?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-5 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-purple-900 mb-3">Write a new memory</h3>
      {error ? (
        <p className="text-sm text-red-600 mb-2">{error}</p>
      ) : null}
      <div className="grid grid-cols-1 gap-3">
        <input
          className="w-full rounded-xl border border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/70"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full min-h-[120px] rounded-xl border border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/70"
          placeholder="Share your story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 shadow hover:shadow-lg transition disabled:opacity-60"
        >
          {loading ? 'Saving...' : 'Publish'}
        </button>
      </div>
    </motion.form>
  );
}
