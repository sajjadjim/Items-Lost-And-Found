import React, { useState, useEffect } from 'react';

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvcYOd9o9f7HkyJ422y7gtFA0PlA3hkXJ1wg&s",
  "https://blog.releasemyad.com/wp-content/uploads/2021/05/lost-and-found-1.jpg",
  "https://media.istockphoto.com/id/477273563/vector/lost-found-box.jpg?s=612x612&w=0&k=20&c=D63_IrCalWqRLpYCnBA5b5QTfhxwbSggkxLiw7vQGGs=",
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative w-full h-[450px] overflow-hidden rounded-lg shadow-lg">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`slide-${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-2 shadow transition"
        onClick={() =>
          setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
        }
        aria-label="Previous Slide"
      >
        &#8592;
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-2 shadow transition"
        onClick={() =>
          setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
        }
        aria-label="Next Slide"
      >
        &#8594;
      </button>
    </div>
  );
}

export default Carousel;