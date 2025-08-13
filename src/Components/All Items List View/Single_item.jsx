import React, { useContext, useState } from "react";
import { Link } from "react-router"; // change to 'react-router-dom' if needed
import { AuthContext_File } from "../../Authcontext/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";
import {
  MapPin,
  Calendar,
  Tag,
  Mail,
  AlertTriangle,
  CheckCircle2,
  Check,
} from "lucide-react";

const Single_item = ({ item }) => {
  const { user } = useContext(AuthContext_File);
  const { email, postType, thumbnail, description, date, location, category, _id, title } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(date ? new Date(date) : new Date());

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toYMD = (d) =>
    new Date(d).toISOString().split("T")[0];

  const typeStyle = (type) => {
    switch (type) {
      case "Lost":
        return {
          badge: "bg-red-500 text-white ring-red-300/60",
          chip: "border-red-200 text-red-600",
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
          glow: "shadow-[0_12px_30px_-12px_rgba(239,68,68,0.5)]",
          ring: "hover:ring-red-200",
        };
      case "Found":
        return {
          badge: "bg-green-500 text-white ring-green-300/60",
          chip: "border-green-200 text-green-600",
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
          glow: "shadow-[0_12px_30px_-12px_rgba(34,197,94,0.5)]",
          ring: "hover:ring-green-200",
        };
      case "recovered":
        return {
          badge: "bg-gray-500 text-white ring-gray-300/60",
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

  const s = typeStyle(postType);

  // Single submission flow: submit recovery info THEN update the item status
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const payload = {
      itemId: _id,
      recoveryDate: toYMD(modalDate),
      userEmail: user?.email,
      location: form.location?.value || location,
      date: toYMD(new Date()),
      title,
      thumbnail,
      recoveryStatus: form.recoveryStatus?.value,
    };

    try {
      // 1) Save recovery info
      const res = await axios.post(
        "https://b11a11-server-side-sajjadjim.vercel.app/recoverItems",
        payload
      );

      // 2) Update the main item postType only if recovered / not_recovered selected
      if (payload.recoveryStatus) {
        const put = await fetch(
          `https://b11a11-server-side-sajjadjim.vercel.app/itemsAll/${_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              postType:
                payload.recoveryStatus === "recovered"
                  ? "recovered"
                  : postType, // keep original if not_recovered
            }),
          }
        );
        const putData = await put.json();
        // server might return modifiedCount or acknowledged; accept either
        if (!(putData?.modifiedCount > 0 || putData?.acknowledged)) {
          console.warn("Update response not clearly successful:", putData);
        }
      }

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Item recovery info submitted.",
        timer: 1800,
        showConfirmButton: false,
      });

      form.reset();
      closeModal();
      // Optionally: window.location.reload();  // if you want to force refresh
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit recovery info.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center py-6">
      <div
        className={`relative w-96 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-3 shadow-sm ${s.glow} hover:shadow-lg ${s.ring} hover:ring-4 transition-all duration-300`}
      >
        {/* Image + badge */}
        <figure className="relative overflow-hidden rounded-xl">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-56 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl" />
          <button
            type="button"
            onClick={postType === "recovered" ? undefined : openModal}
            title={postType === "recovered" ? "Already recovered" : "Update status"}
            className={`absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${s.badge} ${
              postType === "recovered" ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {s.icon}
            {postType}
          </button>
        </figure>

        {/* Body */}
        <div className="p-4">
          <h2 className="text-lg font-bold mb-1 line-clamp-1">{title || "Untitled"}</h2>
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">{description}</p>

          <ul className="text-sm text-gray-700 space-y-1.5 mb-4">
            <li className="flex items-center gap-2">
              <Tag className="w-4 h-4" /> <span className="font-semibold">Category:</span> {category}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> <span className="font-semibold">Location:</span> {location}
            </li>
            <li className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> <span className="font-semibold">Date:</span> {date}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> <span className="font-semibold">Posted by:</span> {email}
            </li>
          </ul>

          <div className="flex items-center justify-between">
            <span className={`badge badge-outline ${s.chip}`}>{category}</span>
            <span className={`badge badge-outline ${s.chip}`}>{postType}</span>
          </div>
        </div>

        <div className="grid justify-items-center pb-3">
          <Link
            to={`/detailsItem/${_id}`}
            className="btn border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 px-5"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center text-black items-center bg-black/40 backdrop-blur-sm p-3">
          <form
            onSubmit={handleSubmit}
            className="w-96 bg-white rounded-2xl border border-gray-200 shadow-2xl p-6 relative"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-2 right-3 text-xl hover:text-red-500"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">Update Recovery</h2>

            <div className="space-y-3 text-sm">
              <div>
                <label className="font-semibold block mb-1">Title</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 bg-gray-50"
                  value={title}
                  readOnly
                  name="title"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Location</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  name="location"
                  placeholder="Update location (optional)"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Recovery Status</label>
                <select className="w-full border rounded px-3 py-2" name="recoveryStatus" required>
                  <option value="" disabled>
                    Select recovery status
                  </option>
                  <option value="recovered">Recovered</option>
                  <option value="not_recovered">Not Recovered</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Date</label>
                <DatePicker
                  selected={modalDate}
                  onChange={(d) => setModalDate(d)}
                  className="w-full border rounded px-3 py-2"
                  dateFormat="yyyy-MM-dd"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Posted by</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 bg-gray-50"
                  value={user?.email || ""}
                  readOnly
                  name="userEmail"
                />
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white  hover:bg-indigo-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Single_item;
