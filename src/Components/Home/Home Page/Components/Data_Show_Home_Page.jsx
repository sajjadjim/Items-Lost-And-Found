import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // change to 'react-router-dom' if needed
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Tag,
  User,
  Mail,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const Data_Show_Home_Page = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://b11a11-server-side-sajjadjim.vercel.app/itemsAll")
      .then((res) => res.json())
      .then((data) => {
        // Sort by date desc and keep latest 6
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setItems(sorted.slice(0, 6));
      });
  }, []);

  const typeStyles = (type) => {
    if (type === "Lost") {
      return {
        badge: "bg-red-500/95 text-white ring-red-300/50",
        glow: "shadow-[0_10px_30px_-10px_rgba(239,68,68,0.55)]",
        hoverRing: "hover:ring-red-200",
        icon: <AlertTriangle className="w-3.5 h-3.5" />,
      };
    }
    if (type === "Found") {
      return {
        badge: "bg-green-500/95 text-white ring-green-300/50",
        glow: "shadow-[0_10px_30px_-10px_rgba(34,197,94,0.55)]",
        hoverRing: "hover:ring-green-200",
        icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      };
    }
    return {
      badge: "bg-amber-500/95 text-white ring-amber-300/50",
      glow: "shadow-[0_10px_30px_-10px_rgba(245,158,11,0.55)]",
      hoverRing: "hover:ring-amber-200",
      icon: <Tag className="w-3.5 h-3.5" />,
    };
  };

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="max-w-6xl mx-auto md:mt-10 px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Latest 6 Items
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {[...items].reverse().map((item) => {
          const s = typeStyles(item.postType);
          return (
            <motion.div
              key={item._id}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={`group relative rounded-2xl border border-gray-200/70  backdrop-blur-sm p-3 shadow-sm ${s.glow} hover:shadow-lg hover:border-gray-300 ${s.hoverRing} hover:ring-4 ring-offset-0 transition-all duration-300`}
            >
              {/* Image + type badge */}
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl" />
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${s.badge}`}
                    title={item.postType}
                  >
                    {s.icon}
                    {item.postType || "N/A"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="pt-4 px-1 pb-1">
                <h3 className="text-lg font-semibold tracking-tight mb-1.5 line-clamp-1">
                  {item.title}
                </h3>

                {/* Chips row */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {item.category && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                      <Tag className="w-3.5 h-3.5" />
                      {item.category}
                    </span>
                  )}
                  {item.location && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  )}
                  {item.date && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.date)}
                    </span>
                  )}
                </div>

                {/* Poster */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs ">
                    {item.displayName ? (
                      <>
                        <User className="w-4 h-4" />
                        <span className="truncate max-w-[160px]">
                          {item.displayName}
                        </span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span className="truncate max-w-[180px]">
                          {item.email}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Subtle CTA */}
                  <Link
                    to={`/detailsItem/${item._id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid justify-items-center">
        <Link
          className="btn my-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 hover:opacity-90 px-6"
          to={"/postItems"}
        >
          Show more
        </Link>
      </div>
    </div>
  );
};

export default Data_Show_Home_Page;
