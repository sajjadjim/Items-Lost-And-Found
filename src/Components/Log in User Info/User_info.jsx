import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext_File } from "../../Authcontext/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import {
  FiUser,
  FiMail,
  FiImage,
  FiKey,
  FiEdit2,
  FiCheck,
  FiX,
  FiAlertCircle,
  FiHash,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const User_info = () => {
  const { user } = useContext(AuthContext_File);

  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Local preview state for the form
  const [formState, setFormState] = useState({
    name: "",
    photoUrl: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const displayName = useMemo(
    () => user?.displayName || dbUser?.name || "No Name",
    [user?.displayName, dbUser?.name]
  );
  const photoURL = useMemo(
    () =>
      user?.photoURL ||
      dbUser?.photoUrl ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        displayName || "User"
      )}`,
    [user?.photoURL, dbUser?.photoUrl, displayName]
  );
  const email = useMemo(
    () => user?.email || dbUser?.email || "No Email",
    [user?.email, dbUser?.email]
  );
  const uid = useMemo(
    () => user?.uid || dbUser?._id || "No ID",
    [user?.uid, dbUser?._id]
  );

  // Fetch DB user
  useEffect(() => {
    let active = true;
    const run = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      try {
        const accessToken = user?.accessToken;
        const res = await fetch(
          `https://b11a11-server-side-sajjadjim.vercel.app/users?email=${encodeURIComponent(
            user.email
          )}`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await res.json();
        if (!active) return;
        if (Array.isArray(data) && data.length > 0) {
          setDbUser(data[0]);
        }
      } catch {
        /* ignore */
      } finally {
        if (active) setLoading(false);
      }
    };
    run();
    return () => {
      active = false;
    };
  }, [user?.email, user?.accessToken]);

  // When opening the form, hydrate fields from current values
  const openForm = () => {
    setFormState({
      name: dbUser?.name || user?.displayName || "",
      photoUrl: dbUser?.photoUrl || user?.photoURL || "",
      email: dbUser?.email || user?.email || "",
      password: dbUser?.password || "",
    });
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const onField = (field) => (e) =>
    setFormState((s) => ({ ...s, [field]: e.target.value }));

  const handleUpdateUserInformation = async (e) => {
    e.preventDefault();

    const updatedUser = {
      name: formState.name,
      photoUrl: formState.photoUrl,
      email: formState.email,
      password: formState.password,
    };

    // Confirm
    const confirm = await Swal.fire({
      title: "Save changes?",
      text: "Your profile information will be updated.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
      cancelButtonText: "Cancel",
    });
    if (!confirm.isConfirmed) return;

    try {
      setSubmitting(true);
      const res = await axios.put(
        `https://b11a11-server-side-sajjadjim.vercel.app/users/${
          dbUser?._id || user?.uid
        }`,
        updatedUser,
        {
          headers: { authorization: `Bearer ${user?.accessToken}` },
        }
      );

      if (res.data?.modifiedCount > 0) {
        Swal.fire("Success", "User information updated!", "success");
        setDbUser((prev) => ({ ...(prev || {}), ...updatedUser }));
        setShowForm(false);
      } else {
        Swal.fire("Info", "No changes were made.", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update user information.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-4">
        <div className="max-w-md w-full bg-base-100 border border-base-300 rounded-2xl p-6 text-center">
          <FiAlertCircle className="mx-auto h-8 w-8 text-warning mb-2" />
          <h2 className="text-xl font-semibold mb-1">You’re not logged in</h2>
          <p className="opacity-80 mb-4">Please log in to view your profile.</p>
          <a href="/login" className="btn btn-primary">Go to Login</a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-4">
        <div className="max-w-sm w-full bg-base-100 border border-base-300 rounded-2xl p-6">
          <div className="animate-pulse">
            <div className="mx-auto h-24 w-24 rounded-full bg-base-300 mb-4" />
            <div className="h-5 w-2/3 bg-base-300 rounded mx-auto mb-2" />
            <div className="h-4 w-1/2 bg-base-300 rounded mx-auto mb-1" />
            <div className="h-4 w-1/3 bg-base-300 rounded mx-auto" />
            <div className="mt-4 h-10 w-32 bg-base-300 rounded mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 max-w-4xl mx-auto">
      {/* Profile Card */}
      <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl overflow-hidden">
        {/* Subtle header stripe */}
        <div className="h-20 bg-gradient-to-r from-blue-600 to-indigo-600" />

        <div className="-mt-12 px-6 pb-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full ring-4 ring-base-100 border-2 border-white overflow-hidden mx-auto">
            <img
              src={photoURL}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name & email */}
          <h2 className="text-center text-2xl font-bold mt-3">{displayName}</h2>
          <p className="text-center opacity-80 flex items-center justify-center gap-2">
            <FiMail className="h-4 w-4" />
            {email}
          </p>

          {/* ID chip */}
          <div className="flex justify-center mt-2">
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-base-200 border border-base-300">
              <FiHash className="h-4 w-4" />
              <span className="truncate max-w-[220px]">ID: {uid}</span>
            </span>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-3 mt-5">
            {!showForm ? (
              <button
                className="btn btn-primary gap-2"
                onClick={openForm}
                title="Update profile"
              >
                <FiEdit2 className="h-4 w-4" />
                Update
              </button>
            ) : (
              <button
                className="btn btn-ghost gap-2"
                onClick={closeForm}
                title="Close form"
              >
                <FiX className="h-4 w-4" />
                Close
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Update Form */}
      {showForm && (
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* Left: Live Preview */}
          <div className="bg-base-100 border border-base-300 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-base-300 ring-2 ring-base-200">
                <img
                  src={
                    formState.photoUrl?.trim()
                      ? formState.photoUrl
                      : photoURL
                  }
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 text-center">
                <div className="font-semibold">{formState.name || displayName}</div>
                <div className="text-sm opacity-80">{formState.email || email}</div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-base-100 border border-base-300 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Edit Information</h3>

            <form className="space-y-4" onSubmit={handleUpdateUserInformation}>
              {/* Name */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiUser className="h-4 w-4" /> Name
                  </span>
                </div>
                <input
                  name="name"
                  value={formState.name}
                  onChange={onField("name")}
                  placeholder="Your full name"
                  className="input input-bordered w-full"
                />
              </label>

              {/* Photo URL */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiImage className="h-4 w-4" /> Photo URL
                  </span>
                </div>
                <input
                  name="photoUrl"
                  value={formState.photoUrl}
                  onChange={onField("photoUrl")}
                  placeholder="https://example.com/your-photo.jpg"
                  className="input input-bordered w-full"
                />
              </label>

              {/* Email */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiMail className="h-4 w-4" /> Email
                  </span>
                </div>
                <input
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={onField("email")}
                  className="input input-bordered w-full"
                />
              </label>

              {/* Password + toggle */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiKey className="h-4 w-4" /> Password
                  </span>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formState.password}
                    onChange={onField("password")}
                    className="input input-bordered w-full pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/70 hover:text-base-content"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <div className="label">
                  <span className="label-text-alt opacity-70">
                    Avoid reusing passwords. Consider changing it regularly.
                  </span>
                </div>
              </label>

              <button
                type="submit"
                className={`btn btn-primary w-full ${submitting ? "btn-disabled" : ""}`}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <FiCheck className="h-4 w-4" />
                    Update Information
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default User_info;
