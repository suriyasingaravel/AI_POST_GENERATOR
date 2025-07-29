import { motion } from "framer-motion";
import { FaRobot, FaArrowRight } from "react-icons/fa";

const features = [
  "Multi-platform post generation (LinkedIn, Twitter, Instagram)",
  "Real-time web search & summarization",
  "Engaging content in seconds",
  "Flexible & easy to use",
  "Beautiful, responsive UI",
];

export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-primary to-primary-dark text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl text-center"
      >
        <div className="flex justify-center mb-6">
          <FaRobot className="text-6xl text-white drop-shadow-xl animate-bounce" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          AI UI <span className="text-accent">Post Generator</span>
        </h1>
        <p className="text-lg md:text-xl font-light mb-8">
          Instantly create engaging, cross-platform social media content powered
          by next-gen AI. Just enter your topic and get compelling posts—ready
          for any network.
        </p>
        <ul className="mb-8 text-md md:text-lg text-background">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 justify-center mb-2">
              <span className="w-2 h-2 bg-accent rounded-full inline-block" />{" "}
              {f}
            </li>
          ))}
        </ul>
        <button
          onClick={onStart}
          className="mt-6 flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-light transition-transform shadow-lg"
        >
          Try Demo <FaArrowRight className="animate-pulse" />
        </button>
      </motion.div>
    </div>
  );
}
