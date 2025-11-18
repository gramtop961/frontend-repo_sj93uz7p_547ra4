import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/kqB-rdL4TCJ7pyGb/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <span className="inline-flex items-center rounded-full bg-white/20 text-white px-4 py-1 text-sm backdrop-blur-md border border-white/30 shadow-sm">
            A cozy corner on the internet ☕
          </span>
          <h1 className="mt-6 text-5xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
            Mom's Colorful Blog
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Stories, recipes, and little moments that make life sweet. Soft animations, beautiful colors, and a warm vibe.
          </p>
        </motion.div>
      </div>

      {/* Soft gradient overlay to make text readable while not blocking interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pink-600/20 via-purple-600/20 to-white/60"></div>
    </section>
  );
}
