import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router"; // change to 'react-router-dom' if v6
import { motion } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiShield,
  FiMapPin,
  FiSmile,
  FiChevronDown,
  FiPlusCircle,
  FiGrid,
} from "react-icons/fi";

import image1 from "../../../../../public/image Hero/image1.png";
import image2 from "../../../../../public/image Hero/image2.png";
import image3 from "../../../../../public/image Hero/image3.png";

function CarouselHome() {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      src: "https://dtimes.ng/wp-content/uploads/2025/01/Web-21.png",
      alt: "Help families reunite with their lost items",
      title: "Lost something?",
      subtitle: "Post details in minutes and boost your chances of recovery.",
      badges: ["Safe & private", "Photo-first posts", "Fast replies"],
      align: "items-end md:items-start", // control caption vertical align per slide
    },
    {
      src: "https://www.qatarairways.com/content/dam/images/renditions/horizontal-3/miscellaneous/animal/h3-cat-pet-container.jpg",
      alt: "Found items returned with a smile",
      title: "Found an item?",
      subtitle: "Report it and let the right owner find you quickly.",
      badges: ["Location-based search", "Simple verification", "No fees"],
      align: "items-end md:items-start",
    },
    {
      src: image3,
      alt: "Community-powered kindness",
      title: "Community that cares",
      subtitle: "Together we return what matters—phones, wallets, pets & more.",
      badges: ["Trusted community", "Helpful tips", "Kindness points"],
      align: "items-end md:items-start",
    },
  ];

  const handleExploreMore = () => {
    const nextSection = document.getElementById("explore-more-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  // Motion variants
  const captionVariants = {
    initial: { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const titleVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.08, duration: 0.5 } },
  };

  const subtitleVariants = {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.18, duration: 0.45 } },
  };

  const badgeVariants = {
    initial: { opacity: 0, y: -6 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.28 + i * 0.06, duration: 0.35 },
    }),
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto px-3"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="rounded-3xl overflow-hidden shadow-xl border border-base-300 bg-base-100">
        <Carousel
          autoPlay
          infiniteLoop
          interval={4300}
          transitionTime={700}
          swipeable
          emulateTouch
          stopOnHover
          showThumbs={false}
          showStatus={false}
          useKeyboardArrows
          selectedItem={current}
          onChange={(i) => setCurrent(i)}
          ariaLabel="Lost & Found highlights"
          renderIndicator={(onClick, isSelected, index, label) => (
            <button
              key={index}
              onClick={onClick}
              title={label}
              aria-label={label}
              className={`mx-1 h-2 w-2 rounded-full transition-all ${
                isSelected ? "w-6 bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
              }`}
              type="button"
            />
          )}
          renderArrowPrev={(onClick, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClick}
                title={label}
                aria-label={label}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 grid place-items-center rounded-full bg-black/35 hover:bg-black/45 p-2 text-white"
              >
                <FiChevronLeft className="h-5 w-5" />
              </button>
            )
          }
          renderArrowNext={(onClick, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClick}
                title={label}
                aria-label={label}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 grid place-items-center rounded-full bg-black/35 hover:bg-black/45 p-2 text-white"
              >
                <FiChevronRight className="h-5 w-5" />
              </button>
            )
          }
        >
          {slides.map((s, i) => (
            <div key={i} className="relative group">
              <img
                src={s.src}
                alt={s.alt}
                className="h-[48vh] md:h-[64vh] w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
              {/* Soft gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

              {/* Animated caption (re-animates after each slide change via key) */}
              <div className={`absolute inset-0 flex ${s.align}`}>
                <motion.div
                  key={current} // <-- forces re-animation when slide changes
                  variants={captionVariants}
                  initial="initial"
                  animate="animate"
                  className="w-full px-5 md:px-10 pb-6 md:pb-0 pt-6"
                >
                  <div className="max-w-2xl bg-black/25 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-white shadow-lg">
                    {/* Top tiny info row */}
                    <div className="flex items-center gap-2 text-xs md:text-sm opacity-90 mb-2">
                      <FiShield className="h-4 w-4" />
                      <span>Verified & community-safe</span>
                      <FiMapPin className="h-4 w-4 ml-2" />
                      <span>Location smart</span>
                      <FiSmile className="h-4 w-4 ml-2" />
                      <span>Friendly support</span>
                    </div>

                    {/* Title */}
                    <motion.h2
                      variants={titleVariants}
                      className="text-2xl md:text-4xl font-bold leading-tight"
                    >
                      {s.title}
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                      variants={subtitleVariants}
                      className="mt-2 text-sm md:text-base opacity-95"
                    >
                      {s.subtitle}
                    </motion.p>

                    {/* Badges with stagger-like effect */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {s.badges.map((b, bi) => (
                        <motion.span
                          key={b}
                          variants={badgeVariants}
                          initial="initial"
                          animate="animate"
                          custom={bi}
                          className="text-[11px] md:text-xs rounded-full bg-white/15 border border-white/25 px-3 py-1"
                        >
                          {b}
                        </motion.span>
                      ))}
                    </div>

                    {/* CTA Row */}
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.35 }}
                      className="mt-4 flex flex-wrap gap-3"
                    >
                      <Link
                        to="/addItems"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm md:text-base hover:opacity-90"
                      >
                        <FiPlusCircle className="h-4 w-4" />
                        Post Lost / Found
                      </Link>
                      <Link
                        to="/postItems"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-4 py-2 text-sm md:text-base hover:bg-white/20"
                      >
                        <FiGrid className="h-4 w-4" />
                        Browse Items
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Explore more (enters after carousel) */}
      <motion.div
        className="grid justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        <button
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-white hover:opacity-90 transition"
          onClick={handleExploreMore}
        >
          Explore More
          <FiChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default CarouselHome;
