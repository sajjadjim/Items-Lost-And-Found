import { useEffect, useState } from "react";
import CountUp from "react-countup";
const NumberofUserWebsite = () => {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    fetch("/LawStats.json")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

return (
    <div className="p-10 text-center">
        <h2 className="text-3xl font-bold mb-2">About Our Lost and Found Website</h2>
        <p className="text-gray-600 mb-10">
            This website helps you report and find lost items easily. Connect with others to return or recover lost belongings quickly and securely.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-gray-100 p-6 rounded-xl shadow text-center"
                >
                    <div className="text-4xl mb-4">{stat.icon}</div>
                    <div className="text-3xl font-bold text-blue-600">
                        <CountUp start={0} end={stat.value} duration={2} separator="," suffix="+" />
                    </div>
                    <p className="mt-2 text-gray-700">{stat.label}</p>
                </div>
            ))}
        </div>
    </div>
);
};

export default NumberofUserWebsite;