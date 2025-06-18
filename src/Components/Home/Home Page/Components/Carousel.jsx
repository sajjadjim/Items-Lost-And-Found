import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  "https://images.pexels.com/photos/13231553/pexels-photo-13231553.jpeg",
  "https://blog.releasemyad.com/wp-content/uploads/2021/05/lost-and-found-1.jpg",
  "https://media.istockphoto.com/id/477273563/vector/lost-found-box.jpg?s=612x612&w=0&k=20&c=D63_IrCalWqRLpYCnBA5b5QTfhxwbSggkxLiw7vQGGs=",
];

const variants = {
  enter: { opacity: 0, scale: 1.05 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); 
    return () => clearInterval(interval);
  }, [hovered]);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div
      className="relative w-full h-[450px] overflow-hidden rounded-xl shadow-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`slide-${currentIndex}`}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full border-2 border-white ${idx === currentIndex ? "bg-white" : "bg-transparent"
              } transition-colors`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 z-20"
        onClick={handlePrev}
        aria-label="Previous Slide"
      >
        &#8592;
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 z-20"
        onClick={handleNext}
        aria-label="Next Slide"
      >
        &#8594;
      </button>
    </div>
  );
}

export default Carousel;
