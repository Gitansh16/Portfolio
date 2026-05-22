import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import AutoSense from "../assets/AutoSense.png";
import StudyNotion from "../assets/StudyNotion.png";
import Musify from "../assets/Musify.png";

const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();

  const sceneRef = useRef(null);

  const projects = useMemo(
  () => [
    {
      title: "AutoSense",
      link: "https://github.com/Gitansh16/AutoSense",
      bgGradient:
        "linear-gradient(135deg, #2261fb 0%, #6a57f6 50%, #903ef6 100%)",
      image: AutoSense,
    },
    {
      title: "StudyNotion",
      link: "https://github.com/Gitansh16/StudyNotion",
      bgGradient:
        "linear-gradient(135deg, #f73385 0%, #f55957 50%, #f0b12c 100%)",
      image: StudyNotion,
    },
    {
      title: "Musify",
      link: "https://github.com/Gitansh16/Musify",
      bgGradient:
        "linear-gradient(135deg, #ff7dc1 0%, #c65cff 50%, #8e5ce9 100%)",
      image: Musify,
    },
  ],
  []
);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map(
    (_, i) => (i + 1) / projects.length
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);

    setActiveIndex(
      idx === -1 ? projects.length - 1 : idx
    );
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
  height: `${100 * projects.length}vh`,
  background: activeProject.bgGradient,
  transition: "background 500ms ease",
}}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        
        <h2
          className={`text-5xl font-semibold z-10 text-center ${
            isMobile ? "mt-4" : "mt-8"
          }`}
        >
          My Work
        </h2>

        <div
          className={`relative w-full flex-1 flex items-center justify-center ${
            isMobile ? "-mt-4" : ""
          }`}
        >
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                idx === activeIndex
                  ? "opacity-100 z-20"
                  : "opacity-0 z-0 sm:z-10"
              }`}
              style={{
                width: "85%",
                maxWidth: "1200px",
              }}
            >
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <motion.h3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] italic font-semibold ${
                      isMobile ? "-mt-24" : ""
                    }`}
                    style={{
                      zIndex: 5,
                      textAlign: isMobile
                        ? "center"
                        : "left",
                    }}
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>

              <div
                className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${
                  isMobile
                    ? "mb-6 rounded-lg"
                    : "mb-10 sm:mb-12 rounded-xl"
                } h-[62vh] sm:h-[66vh]`}
                style={{
                  zIndex: 10,
                  transition: "box-shadow 250ms ease",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl"
                  style={{
                    position: "relative",
                    zIndex: 0,
                    filter:
                      "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
                    transition: "filter 200ms ease",
                  }}
                  loading="lazy"
                />

                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                    opacity: 0.8,
                  }}
                />
              </div>

              <div
                className={`absolute ${
                  isMobile
                    ? "bottom-20"
                    : "bottom-10"
                }`}
              >
                <a
                  href={activeProject?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
                  aria-label={`View ${activeProject?.title}`}
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}