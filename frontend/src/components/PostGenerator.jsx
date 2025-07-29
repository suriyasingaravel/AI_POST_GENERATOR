import { useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import AnimatedRobot from "./AnimatedRobot";
import { motion } from "framer-motion";

export default function PostGenerator() {
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!topic.trim()) {
      setError("Topic is required!");
      return;
    }
    setGenerating(true);
    setResult(null);
    try {
      const res = await axios.post("http://localhost:4000/generate-posts", {
        topic,
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
    }
    setGenerating(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex flex-col items-center mt-12">
        <AnimatedRobot />
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-2 text-primary"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Generate Social Media Posts
        </motion.h2>
        <p className="text-center text-md mb-5 text-gray-600 max-w-xl">
          Enter a topic or event. Our AI will search the web, summarize, and
          create posts for LinkedIn, Twitter, and Instagram!
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4"
        >
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., India's Mars mission success"
            className="px-4 py-3 rounded-lg border border-primary focus:outline-primary focus:ring-2 focus:ring-accent"
            disabled={generating}
          />
          <button
            type="submit"
            className="flex justify-center items-center py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold transition disabled:bg-gray-300"
            disabled={generating}
          >
            {generating ? <Loader /> : "Generate Posts"}
          </button>
        </form>
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

        {result && (
          <motion.div
            className="mt-10 w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 grid gap-6 md:grid-cols-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {Object.entries(result.posts).map(([platform, content]) => (
              <div
                key={platform}
                className="p-4 rounded-lg bg-background flex flex-col"
              >
                <span className="font-semibold text-primary mb-2">
                  {platform}
                </span>
                <div className="text-sm text-gray-700 whitespace-pre-line">
                  {content}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
