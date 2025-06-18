import React, { useEffect, useState } from 'react';

const stats = [
  { icon: '👨‍⚖️', number: 199, label: 'Total users' },
  { icon: '⭐ ⭐ ⭐', number: 466, label: 'Total Reviews' },
  { icon: '🔨', number: 1896, label: 'Items Total' },
  { icon: '👥', number: 299, label: 'Total Staffs' }
];

const DURATION = 4000; // 4 seconds

const StatsCounter = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / DURATION, 1);

      const newCounts = stats.map(stat =>
        Math.floor(stat.number * progress)
      );

      setCounts(newCounts);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="flex justify-center items-center gap-6 flex-wrap p-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="w-60 h-32 flex flex-col justify-center items-center rounded-xl shadow-md bg-gray-50 transition-opacity duration-1000"
        >
          <div className="text-3xl mb-2">{stat.icon}</div>
          <div className="text-2xl font-bold text-blue-600">{counts[index]}+</div>
          <div className="text-sm text-gray-700">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCounter;
