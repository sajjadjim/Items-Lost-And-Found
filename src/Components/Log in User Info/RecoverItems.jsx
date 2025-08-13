import React, { useContext, useEffect, useState, useMemo } from "react";
import { AuthContext_File } from "../../Authcontext/AuthProvider";
import Lottie from "lottie-react";
import noData from "../../../public/noData.json";
import {
  MapPin,
  Calendar,
  CalendarCheck2,
  Tag,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Check,
  LayoutGrid,
  Table2,
} from "lucide-react";

const RecoverItems = () => {
  const { user } = useContext(AuthContext_File);

  const [items, setItems] = useState([]);
  const [viewMode, setViewMode] = useState("card"); // 'card' | 'table'
  const [loading, setLoading] = useState(true);

  // Fetch once (with token if available)
  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!user?.email) {
        setItems([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `https://b11a11-server-side-sajjadjim.vercel.app/recoverItems?email=${encodeURIComponent(
            user.email
          )}`,
          user?.accessToken
            ? { headers: { authorization: `Bearer ${user.accessToken}` } }
            : undefined
        );
        const data = await res.json();
        if (active) {
          setItems(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error(e);
        if (active) setItems([]);
      } finally {
        if (active) setTimeout(() => setLoading(false), 400); // small grace
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [user?.email, user?.accessToken]);

  const handleViewMode = (mode) => {
    if (mode !== viewMode) {
      setViewMode(mode);
      // Optional micro-loading to smoothen switch to table
      if (mode === "table") {
        setLoading(true);
        setTimeout(() => setLoading(false), 400);
      }
    }
  };

  const typeStyles = (type) => {
    switch (type) {
      case "Lost":
        return {
          badge: "bg-red-500 ring-red-300/60",
          chip: "border-red-200 text-red-600",
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
          glow: "shadow-[0_12px_30px_-12px_rgba(239,68,68,0.5)]",
          ring: "hover:ring-red-200",
        };
      case "Found":
        return {
          badge: "bg-green-500  ring-green-300/60",
          chip: "border-green-200 text-green-600",
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
          glow: "shadow-[0_12px_30px_-12px_rgba(34,197,94,0.5)]",
          ring: "hover:ring-green-200",
        };
      case "recovered":
        return {
          badge: "bg-gray-600  ring-gray-300/60",
          chip: "border-gray-200 text-gray-600",
          icon: <Check className="w-3.5 h-3.5" />,
          glow: "shadow-[0_12px_30px_-12px_rgba(107,114,128,0.5)]",
          ring: "hover:ring-gray-200",
        };
      default:
        return {
          badge: "bg-amber-500 text-white ring-amber-300/60",
          chip: "border-amber-200 text-amber-700",
          icon: <Tag className="w-3.5 h-3.5" />,
          glow: "shadow-[0_12px_30px_-12px_rgba(245,158,11,0.5)]",
          ring: "hover:ring-amber-200",
        };
    }
  };

  const Skeleton = () => (
    <div className="grid md:grid-cols-3 gap-5 grid-cols-1 justify-items-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="w-96 animate-pulse rounded-2xl border border-gray-200 bg-white/80 p-3 shadow-sm"
        >
          <div className="h-56 w-full rounded-xl bg-gray-200 mb-3" />
          <div className="h-5 w-2/3 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-full bg-gray-200 rounded mb-2" />
          <div className="h-4 w-5/6 bg-gray-200 rounded mb-3" />
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded" />
            <div className="h-6 w-16 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );

  const Card = ({ it }) => {
    const s = typeStyles(it.postType);

    return (
      <div
        className={`relative w-96  rounded-2xl border border-gray-200  backdrop-blur p-3  shadow-sm ${s.glow} hover:shadow-lg ${s.ring} hover:ring-4 transition-all duration-300`}
      >
        <figure className="relative overflow-hidden rounded-xl">
          <img
            src={it.thumbnail}
            alt={it.title}
            className="w-full h-56 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl" />
          <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 cursor-default select-none">
            <span className={`${s.badge} inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ring-1`}>
              {s.icon}
              {it.postType || "Status"}
            </span>
          </div>
        </figure>

        <div className="p-4">
          <h3 className="text-lg font-bold mb-1 line-clamp-1">{it.title || "Untitled"}</h3>
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">
            {it.description || "No description."}
          </p>

          <ul className="text-sm  space-y-1.5 mb-4">
            {it.category && (
              <li className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span className="font-semibold">Category:</span> {it.category}
              </li>
            )}
            {it.location && (
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="font-semibold">Location:</span> {it.location}
              </li>
            )}
            {it.date && (
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="font-semibold">Date:</span> {it.date}
              </li>
            )}
            {it.recoveryDate && (
              <li className="flex items-center gap-2">
                <CalendarCheck2 className="w-4 h-4" />
                <span className="font-semibold">Recovered:</span> {it.recoveryDate}
              </li>
            )}
            {it.email && (
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="font-semibold">Posted by:</span> {it.email}
              </li>
            )}
          </ul>

          <div className="flex items-center justify-between">
            <span className={`badge badge-outline ${s.chip}`}>{it.category || "Item"}</span>
            <span className={`badge badge-outline ${s.chip}`}>{it.postType || "Status"}</span>
          </div>
        </div>
      </div>
    );
  };

  const EnhancedTable = () => (
    <div className="overflow-x-auto rounded-2xl border border-gray-200  backdrop-blur shadow-sm">
      <table className="table">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="whitespace-nowrap">#</th>
            <th className="whitespace-nowrap">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" /> Title
              </div>
            </th>
            <th className="whitespace-nowrap">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Location
              </div>
            </th>
            <th className="whitespace-nowrap">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Date
              </div>
            </th>
            <th className="whitespace-nowrap">
              <div className="flex items-center gap-2">
                <CalendarCheck2 className="w-4 h-4" /> Recover Date
              </div>
            </th>
            <th className="whitespace-nowrap">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Status
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, index) => {
            const s = typeStyles(it.postType);
            return (
              <tr key={it._id} className="hover:bg-gray-50/60">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={it.thumbnail} alt={it.title} loading="lazy" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{it.title}</div>
                      <div className="text-sm opacity-60 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" />
                        {it.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap">{it.location}</td>
                <td className="whitespace-nowrap">{it.date}</td>
                <td className="whitespace-nowrap">{it.recoveryDate || "-"}</td>
                <td className="whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${s.badge}`}>
                    {s.icon}
                    {it.postType || "Status"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* View toggles */}
      <div className="my-4 flex gap-3 justify-center">
        <button
          className={`px-4 py-2 rounded-xl inline-flex items-center gap-2 transition ${
            viewMode === "card"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => handleViewMode("card")}
        >
          <LayoutGrid className="w-4 h-4" />
          Card View
        </button>
        <button
          className={`px-4 py-2 rounded-xl inline-flex items-center gap-2 transition ${
            viewMode === "table"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => handleViewMode("table")}
        >
          <Table2 className="w-4 h-4" />
          Table View
        </button>
      </div>

      {/* Loading */}
      {loading && <Skeleton />}

      {/* Empty */}
      {!loading && items.length === 0 && (
        <div className="text-center text-gray-600 my-10 grid justify-items-center">
          <p className="mb-3">No items recovered for this user.</p>
          <Lottie className="w-[320px]" animationData={noData} loop />
        </div>
      )}

      {/* Card view */}
      {!loading && items.length > 0 && viewMode === "card" && (
        <div className="grid md:grid-cols-3 gap-5 md:gap-15 grid-cols-1 justify-items-center">
          {items.map((it) => (
            <Card key={it._id} it={it} />
          ))}
        </div>
      )}

      {/* Table view */}
      {!loading && items.length > 0 && viewMode === "table" && <EnhancedTable />}
    </div>
  );
};

export default RecoverItems;
