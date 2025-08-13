import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router"; // change to 'react-router-dom' if needed
import {
  Calendar,
  MapPin,
  Mail,
  Tag,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const DetailsItems = () => {
  const data = useLoaderData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const {
    email,
    postType,
    thumbnail,
    description,
    date,
    location,
    category,
    title,
  } = data || {};

  const typeStyles = (type) => {
    if (type === "Lost") {
      return {
        badge: "bg-red-500 text-white ring-red-300/60",
        icon: <AlertTriangle className="w-3.5 h-3.5" />,
      };
    }
    if (type === "Found") {
      return {
        badge: "bg-green-500 text-white ring-green-300/60",
        icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      };
    }
    return {
      badge: "bg-amber-500 text-white ring-amber-300/60",
      icon: <Tag className="w-3.5 h-3.5" />,
    };
  };

  const s = typeStyles(postType);

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    } catch {
      return iso || "";
    }
  };

  if (loading) {
    // Elegant skeleton loader
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="animate-pulse">
          <div className="h-64 md:h-80 w-full bg-gray-200 rounded-2xl mb-6" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="h-7 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-20 bg-gray-200 rounded" />
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
      {/* Back */}
      <div className="mb-4">
        <Link
          to="/postItems"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      {/* Hero Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur">
        {/* Image header with gradient overlay + badge */}
        <div className="relative">
          <img
            src={thumbnail}
            alt={title || category || "item image"}
            className="w-full h-64 md:h-80 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute top-4 right-4">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs md:text-sm font-semibold ring-1 ${s.badge}`}
              title={postType}
            >
              {s.icon}
              {postType}
            </span>
          </div>
          {/* Title over image if available */}
          {(title || category) && (
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-xl md:text-2xl font-bold text-white drop-shadow-sm">
                {title || category}
              </h1>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left: Quick facts */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Calendar className="w-4 h-4" />
                <span className="font-semibold">Date:</span>
                <span>{formatDate(date)}</span>
              </div>
              {location && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="w-4 h-4" />
                  <span className="font-semibold">Location:</span>
                  <span className="truncate">{location}</span>
                </div>
              )}
              {category && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Tag className="w-4 h-4" />
                  <span className="font-semibold">Category:</span>
                  <span className="capitalize">{category}</span>
                </div>
              )}
              {email && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Mail className="w-4 h-4" />
                  <span className="font-semibold">Posted by:</span>
                  <span className="truncate">{email}</span>
                </div>
              )}
            </div>

            {/* Right: Description */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {description || "No additional description provided."}
              </p>

              {/* CTA Row */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/postItems"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
                >
                  Browse More Items
                </Link>

                {/* Optional: mailto for quick contact */}
                {email && (
                  <a
                    href={`mailto:${email}?subject=${encodeURIComponent(
                      `[${postType}] ${title || category || "Item"}`
                    )}`}
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Contact Poster
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Back button (mobile friendly) */}
      <div className="grid justify-items-center mt-6">
        <Link
          to="/postItems"
          className="btn bg-blue-600 text-white border-0 hover:opacity-90 px-6"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default DetailsItems;
