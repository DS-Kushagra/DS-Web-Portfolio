import React from "react";
import { motion } from "framer-motion";

const AICharacter = () => {
  return (
    <motion.div
      className="relative w-48 h-48 mx-auto"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", duration: 1, bounce: 0.5 }}
    >
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 bg-violet-500/30 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* AI Face Container */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-violet-500 via-violet-600 to-fuchsia-600 rounded-full shadow-lg border-4 border-white/20"
        id="About"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Eyes Container */}
        <div className="relative w-full h-full">
          {/* Left Eye */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-6 h-6"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <div className="absolute inset-0 bg-white rounded-full shadow-inner" />
            <motion.div
              className="absolute inset-1 bg-violet-900 rounded-full"
              animate={{
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
          </motion.div>

          {/* Right Eye */}
          <motion.div
            className="absolute top-1/3 right-1/4 w-6 h-6"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <div className="absolute inset-0 bg-white rounded-full shadow-inner" />
            <motion.div
              className="absolute inset-1 bg-violet-900 rounded-full"
              animate={{
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
          </motion.div>

          {/* Smile */}
          <motion.div className="absolute bottom-1/3 left-1/2 w-20 h-8 -translate-x-1/2">
            <svg width="100%" height="100%" viewBox="0 0 32 16">
              <motion.path
                d="M2 8C2 8 7 14 16 14C25 14 30 8 30 8"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Interactive Speech Bubble */}
      <motion.div
        className="absolute -top-16 -right-8 bg-white text-violet-600 px-6 py-3 rounded-2xl font-bold text-xl shadow-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", bounce: 0.5 }}
        whileHover={{
          scale: 1.1,
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.5 },
        }}
      >
        Hi!
        <motion.div
          className="absolute -bottom-2 left-1/2 w-4 h-4 bg-white transform rotate-45 -translate-x-1/2"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      {/* Floating Animation */}
      <motion.div
        className="absolute inset-0"
        animate={{
          y: [0, -8, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default AICharacter;
