import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = () => {
  return (
    <motion.div
      className="max-w-4xl mx-auto my-16 px-4 py-10  rounded-2xl shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <h2 className="md:text-4xl text-2xl font-bold text-blue-500 mb-4 text-center">
        Welcome to Lost & Found Hub
      </h2>
      <p className=" text-lg text-center">
        This is your safe space to post about anything you've lost or found. Join our mission to reconnect people with their precious items and be a hero in your community.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:px-6 px-2 md:py-3 py-1 rounded-full bg-white  text-blue-500 border-2 border-blue-500 font-semibold shadow-md  transition"
        >
          Post Lost Item
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:px-6 px-2 md:py-3 py-1 rounded-full bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition"
        >
          Post Found Item
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AnimatedSection;
