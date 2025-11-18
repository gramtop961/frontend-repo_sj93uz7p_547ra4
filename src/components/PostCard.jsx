import { motion } from 'framer-motion';

export default function PostCard({ post }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-pink-700/80">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-pink-100 border border-pink-200">{post.author || 'Mom'}</span>
          {post.tags?.length ? (
            <span className="text-pink-600/70">• {post.tags.join(', ')}</span>
          ) : null}
        </div>
        <h3 className="text-xl font-semibold text-purple-900 group-hover:text-pink-700 transition-colors">
          {post.title}
        </h3>
        <p className="text-purple-800/80 line-clamp-3">
          {post.content}
        </p>
      </div>
    </motion.article>
  );
}
