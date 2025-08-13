import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext_File } from "../../Authcontext/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const Add_item = () => {
  const { user } = useContext(AuthContext_File);
  const [dbUser, setDbUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Add | Item";
  }, []);

  // Fetch user record (for display name fallback)
  useEffect(() => {
    if (!user?.email) return;
    const accessToken = user?.accessToken;
    fetch(
      `https://b11a11-server-side-sajjadjim.vercel.app/users?email=${encodeURIComponent(
        user.email
      )}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDbUser(data[0]);
        }
      })
      .catch(() => {});
  }, [user?.email, user?.accessToken]);

  const displayUserName = useMemo(
    () => dbUser?.name || user?.displayName || "",
    [dbUser?.name, user?.displayName]
  );

  // Submit handler
  const handleAddNewItem = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      Swal.fire({
        title: "Not signed in",
        text: "Please login to add an item.",
        icon: "warning",
      });
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const taskData = Object.fromEntries(formData.entries());

    // add dynamic user fields (server-side trust still required)
    taskData.displayName = displayUserName;
    taskData.email = user.email;

    try {
      setSubmitting(true);
      const { data } = await axios.post(
        "https://b11a11-server-side-sajjadjim.vercel.app/itemsAll",
        taskData
      );

      if (data?.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Item added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        form.reset();
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to add item. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error adding item:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while adding the item. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleAddNewItem}
        className="w-full max-w-4xl mx-auto p-8 bg-base-100 rounded-2xl shadow-xl border border-base-300 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center mb-2">Add Lost &amp; Found Item</h2>
        <p className="text-center text-sm opacity-80 -mt-2">
          Provide accurate details so others can verify ownership safely.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Post Type */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Post Type</span>
            </div>
            <select
              name="postType"
              className="select select-bordered w-full"
              required
              defaultValue="Lost"
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </label>

          {/* Thumbnail */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Thumbnail (Image URL)</span>
            </div>
            <input
              type="url"
              name="thumbnail"
              className="input input-bordered w-full"
              required
              placeholder="https://example.com/image.jpg"
            />
          </label>

          {/* Title */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              name="title"
              className="input input-bordered w-full"
              required
              placeholder="Item title"
            />
          </label>

          {/* Category */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Category</span>
            </div>
            <select name="category" className="select select-bordered w-full" required>
              <option value="">Select Category</option>
              <option value="pets">Pets</option>
              <option value="documents">Documents</option>
              <option value="gadgets">Gadgets</option>
              <option value="others">Others</option>
            </select>
          </label>

          {/* Description (full width on md) */}
          <label className="form-control md:col-span-2">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea
              name="description"
              className="textarea textarea-bordered"
              rows={4}
              required
              placeholder="Describe the item (unique marks, color, brand, etc.)"
            />
          </label>

          {/* Location */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Location</span>
            </div>
            <input
              type="text"
              name="location"
              className="input input-bordered w-full"
              required
              placeholder="Where was it lost/found?"
            />
          </label>

          {/* Date */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Date Lost or Found</span>
            </div>
            <input
              type="date"
              name="date"
              className="input input-bordered w-full"
              required
            />
          </label>

          {/* Your Name */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Your Name</span>
            </div>
            <input
              type="text"
              name="displayName"
              className="input input-bordered w-full"
              defaultValue={displayUserName}
              readOnly
            />
          </label>

          {/* Your Email */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Your Email</span>
            </div>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              defaultValue={user?.email || ""}
              readOnly
            />
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Post"}
        </button>
      </form>
    </div>
  );
};

export default Add_item;
