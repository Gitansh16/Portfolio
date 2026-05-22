import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const experiences = [
  {
      type: "experience",
  role: "Software Developer Intern",
  company: "LogicGoals System, Nagpur",
  duration: "Dec 2024 – Feb 2025",
  description:
    "Built responsive web interfaces and integrated secure payment workflows using PHP, HTML, CSS, and JavaScript.",
  },

  {
    type: "education",
    role: "B.Tech in Computer Science and Engineering",
    company: "SRM Institute of Science and Technology",
    duration: "June 2022 – May 2026",
    description: "CGPA: 9.18/10.00",
  },

  {
    type: "education",
    role: "Pre-University Education",
    company: "Adarsh Sanskar Vidyalaya & JR. College",
    duration: "May 2022",
    description: "Percentage: 78.83%",
  },

  {
    type: "education",
    role: "Secondary Education",
    company: "St. Vincent Pallotti School",
    duration: "May 2020",
    description: "Percentage: 91%",
  },
];

function ExperienceItem({
  exp,
  idx,
  start,
  end,
  scrollYProgress,
  layout,
}) {
  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [0, 1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [start, end],
    [0, 1]
  );

  const y = useTransform(
    scrollYProgress,
    [start, end],
    [idx % 2 === 0 ? 30 : -30, 0]
  );

  const x = useTransform(
    scrollYProgress,
    [start, end],
    [-24, 0]
  );

  const cardStyles =
    exp.type === "education"
      ? "bg-blue-950/40 border-blue-500/30"
      : "bg-gray-900/80 border-gray-700/70";

  if (layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div
          className={`z-10 w-7 h-7 rounded-full shadow-[0_0_0_8px_rgba(255,255,255,0.1)] ${
            exp.type === "education"
              ? "bg-blue-400"
              : "bg-white"
          }`}
          style={{ scale, opacity }}
        />

        <motion.div
          className={`absolute ${
            idx % 2 === 0 ? "-top-8" : "-bottom-8"
          } w-[3px] bg-white/40`}
          style={{ height: 40, opacity }}
        />

        <motion.article
          className={`absolute ${
            idx % 2 === 0 ? "bottom-12" : "top-12"
          } ${cardStyles} backdrop-blur border rounded-xl p-7 w-[320px] shadow-lg`}
          style={{
            opacity,
            y,
            maxWidth: "90vw",
          }}
        >
          <span
            className={`text-xs uppercase tracking-widest font-medium ${
              exp.type === "education"
                ? "text-blue-300"
                : "text-gray-400"
            }`}
          >
            {exp.type}
          </span>

          <h3 className="text-xl font-semibold mt-2">
            {exp.role}
          </h3>

          <p className="text-sm text-gray-400 mb-3">
            {exp.company} | {exp.duration}
          </p>

          <p className="text-md text-gray-300 break-words">
            {exp.description}
          </p>
        </motion.article>
      </div>
    );
  }

  return (
    <div className="relative flex items-start">
      <motion.div
        className={`absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full shadow-[0_0_0_8px_rgba(255,255,255,0.1)] ${
          exp.type === "education"
            ? "bg-blue-400"
            : "bg-white"
        }`}
        style={{ scale, opacity }}
      />

      <motion.article
        className={`${cardStyles} backdrop-blur border rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg`}
        style={{ opacity, x }}
        transition={{
          duration: 0.4,
          delay: idx * 0.15,
        }}
      >
        <span
          className={`text-xs uppercase tracking-widest font-medium ${
            exp.type === "education"
              ? "text-blue-300"
              : "text-gray-400"
          }`}
        >
          {exp.type}
        </span>

        <h3 className="text-lg font-semibold mt-2 break-words">
          {exp.role}
        </h3>

        <p className="text-sm text-gray-400 mb-2 break-words">
          {exp.company} | {exp.duration}
        </p>

        <p className="text-sm text-gray-300 break-words">
          {exp.description}
        </p>
      </motion.article>
    </div>
  );
}

export default function Experience() {
  const sceneRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth < 768);

    checkMobile();

    window.addEventListener(
      "resize",
      checkMobile
    );

    return () => {
      window.removeEventListener(
        "resize",
        checkMobile
      );
    };
  }, []);

  const SCENE_HEIGHT_VH = isMobile
    ? 160 * experiences.length
    : 120 * experiences.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = useMemo(() => {
    return experiences.map(
      (_, i) => (i + 1) / experiences.length
    );
  }, []);

  const lineSize = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      id="experience"
      ref={sceneRef}
      className="relative bg-black text-white"
    >
      <div
        style={{
          height: `${SCENE_HEIGHT_VH}vh`,
          minHeight: "120vh",
        }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">
            Journey
          </h2>

          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {!isMobile ? (
              <div className="relative w-full max-w-7xl">
                <div className="relative h-[6px] bg-white/15 rounded">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-white rounded origin-left"
                    style={{ width: lineSize }}
                  />
                </div>

                <div className="relative flex justify-between mt-0">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={
                        idx === 0
                          ? 0
                          : thresholds[idx - 1]
                      }
                      end={thresholds[idx]}
                      scrollYProgress={
                        scrollYProgress
                      }
                      layout="desktop"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative w-full max-w-md">
                <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded">
                  <motion.div
                    className="absolute left-0 top-0 w-[6px] bg-white rounded origin-top"
                    style={{ height: lineSize }}
                  />
                </div>

                <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={
                        idx === 0
                          ? 0
                          : thresholds[idx - 1]
                      }
                      end={thresholds[idx]}
                      scrollYProgress={
                        scrollYProgress
                      }
                      layout="mobile"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}