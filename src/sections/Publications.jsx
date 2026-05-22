import { motion } from "framer-motion";

import Springer from "../assets/Springer.png";
import IEEE from "../assets/IEEE.png";

const publications = [
  {
    title:
      "ANITA: Advanced Novel Integration of a Tiered Aggregator for Credit Card Fraud Detection",
    year: "2025",
    details:
      "Published in Springer Nature Singapore – Lecture Notes in Networks and Systems (LNNS), Vol. 1505, 2026 (Scopus Indexed).",
    extra: (
      <a
        href="https://doi.org/10.1007/978-981-96-8687-2_27"
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 hover:text-cyan-300 underline"
      >
        DOI: 10.1007/978-981-96-8687-2_27
      </a>
    ),
    image: Springer,
  },

  {
    title:
      "Cost-Aware Temporal Deep Learning for Remaining Useful Life Risk Classification in Heavy-Duty Vehicles",
    year: "2026",
    details:
      "Accepted at ICCMC 2026 – IEEE International Conference on Computing Methodologies and Communication.",
    extra:
      "To be published in IEEE Xplore Conference Proceedings.",
    image: IEEE,
  },
];

export default function Publications() {
  return (
    <section
      id="publications"
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20"
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-16 text-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
      >
        Publications
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {publications.map((pub, i) => (
          <motion.div
            key={pub.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: i * 0.2,
            }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:-rotate-1"
          >
            <img
              src={pub.image}
              alt={pub.title}
              className="w-20 h-20 rounded-full border-2 border-white/40 mb-5 object-cover"
              loading="lazy"
            />

            <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Publication
              </span>

              <span className="text-sm text-gray-300 border border-white/20 px-3 py-1 rounded-full bg-white/5">
                {pub.year}
              </span>
            </div>

            <h3 className="text-xl font-semibold leading-snug mb-5">
              {pub.title}
            </h3>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              {pub.details}
            </p>

            <p className="text-sm text-gray-400 break-all text-justify">
              {pub.extra}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}