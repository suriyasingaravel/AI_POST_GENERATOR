import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";

export default function AnimatedRobot() {
  return (
    <motion.div
      className="mb-4"
      animate={{ rotate: [0, 20, -20, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <FaRobot className="text-6xl text-accent drop-shadow-xl" />
    </motion.div>
  );
}
