import {FaLinkedin, FaGithub } from "react-icons/fa6";
import { motion } from "framer-motion";

const socials = [
 
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gitanshpise16/",
  },
  {
    Icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/Gitansh16",
  }
];

const glowVariants = {
  initial: {
    scale: 1,
    y: 0,
    filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
  },

  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },

  tap: {
    scale: 0.95,
    y: 0,
    transition: {
      duration: 0.08,
    },
  },
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black">
      
      <motion.div
        className="relative z-10 px-4 sm:px-8 lg:px-10 py-16 md:py-20 flex flex-col items-center text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Let’s Connect
        </h2>

        <p className="text-gray-400 max-w-xl">
          Building futuristic digital experiences with clean
          design, smooth animations, and scalable development.
        </p>

        <div className="flex items-center gap-6">
          {socials.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="text-white text-3xl"
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        <p className="text-sm text-gray-500">
          © 2026 All Rights Reserved
        </p>

      </motion.div>
    </footer>
  );
}