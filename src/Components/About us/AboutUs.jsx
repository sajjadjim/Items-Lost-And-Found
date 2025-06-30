import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const AboutUs = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() === '') return;
    setSubmitted(true);
    setTimeout(() => {
      setFeedback('');
      setSubmitted(false);
    }, 3000);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    // console.log("User name:", name);
    // console.log("User email:", email);
    // console.log("User feedback:", feedback);
    const feedbackUser = {name , email , feedback}
    // console.log(feedbackUser)

    axios.post('https://b11a11-server-side-sajjadjim.vercel.app/feedback', feedbackUser)
      .then(res => {
      console.log('Feedback submitted:', res.data);
      })
      .catch(err => {
      console.error('Error submitting feedback:', err);
      });
      form.reset()
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto my-16 px-6 pb-5  rounded-2xl shadow-md"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* About Section */}
      <div className="mb-10">
        <h2 className="text-4xl text-center font-bold text-blue-500 mb-4">About Us</h2>
        <p className=" text-lg">
          Welcome to our Lost & Found platform — a place where users can report lost items or post items they’ve found to help others. We aim to build a trustworthy and helpful digital space where people can reconnect with their belongings and show kindness by returning what’s not theirs.
        </p>
      </div>

      {/* Feedback Form */}
      <div>
        <h3 className="text-2xl font-semibold  mb-4">Share Your Feedback</h3>
        <p className=" mb-6">
          Tell us about your experience using the site or suggest features you'd like to see in future updates.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  "
              placeholder="Your name (optional)"
              name="name"
              autoComplete="off"
            />
            <input
              type="email"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  "
              placeholder="Your email (optional)"
              name="email"
              autoComplete="off"
            />
          </div>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  "
            rows="5"
            placeholder="Your feedback here..."
            name="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-400 transition"
          >
            Submit Feedback
          </button>
        </form>
        {submitted && (
          <motion.p
            className="mt-4 text-green-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Thank you for your feedback!
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default AboutUs;
