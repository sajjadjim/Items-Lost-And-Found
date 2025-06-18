import React from 'react';
import { motion } from 'framer-motion';
import { Search, UploadCloud, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Search className="w-8 h-8 text-purple-600" />,
    title: 'Browse Lost & Found Items',
    description:
      'Easily explore all posted items. Use filters to find something that might belong to you or help others.',
  },
  {
    icon: <UploadCloud className="w-8 h-8 text-blue-600" />,
    title: 'Post What You Lost or Found',
    description:
      'Quickly submit a post with location, category, and photos to increase your chances of recovery or returning an item.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
    title: 'Help Build a Trustworthy Community',
    description:
      'By reporting found items or honestly claiming your own, you help create a safer and more helpful environment.',
  },
];

const LostFoundFeatures = () => {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-blue-100 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-purple-700 mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How Our Platform Helps You
        </motion.h2>
        <p className="text-gray-600 mb-12 text-lg">
          Discover how we make it easy to reconnect people with lost belongings.
        </p>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-xl transition"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LostFoundFeatures;
