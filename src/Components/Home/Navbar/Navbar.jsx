import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router"; // change to 'react-router-dom' if using v6
import { AuthContext_File } from "../../../Authcontext/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import { SiTemporal } from "react-icons/si";
import {
  FiHome,
  FiPlusCircle,
  FiGrid,
  FiHelpCircle,
  FiInfo,
  FiMail,
  FiLogOut,
  FiSettings,
  FiList,
  FiCheckCircle,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const THEME_KEY = "lf_theme"; // localStorage key

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext_File);
  const [dbUser, setDbUser] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ----- THEME -----
  const getInitialTheme = () => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(THEME_KEY) : null;
    if (saved === "light" || saved === "dark") return saved;
    // fallback to system preference
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // Apply theme to <html data-theme="...">
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Auto-update if system theme changes (only when user hasn't explicitly chosen?)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      const saved = localStorage.getItem(THEME_KEY);
      if (!saved) setTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // ----- AUTH -----
  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("Logout successful ✅");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    const accessToken = user?.accessToken;
    if (!accessToken) return;
    fetch("https://b11a11-server-side-sajjadjim.vercel.app/users", {
      headers: { authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => setDbUser(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching users:", err));
  }, [user?.accessToken]);

  const currentUser = useMemo(
    () => dbUser.find((u) => u.email === user?.email),
    [dbUser, user?.email]
  );

  const avatarSrc = currentUser?.photoUrl;
  const displayName =
    user?.displayName || currentUser?.name || user?.email?.split("@")[0] || "";

  // ----- NAV ITEMS -----
  const navItems = [
    { to: "/", label: "Home", icon: <FiHome className="h-4 w-4" /> },
    ...(user
      ? [
          {
            to: "/addItems",
            label: "Add Lost & Found",
            icon: <FiPlusCircle className="h-4 w-4" />,
          },
          {
            to: "/postItems",
            label: "Post Items",
            icon: <FiGrid className="h-4 w-4" />,
          },
        ]
      : []),
    { to: "/FaQ", label: "FAQ", icon: <FiHelpCircle className="h-4 w-4" /> },
    { to: "/aboutUs", label: "About Us", icon: <FiInfo className="h-4 w-4" /> },
    { to: "/contact", label: "Contact", icon: <FiMail className="h-4 w-4" /> },
  ];

  // Active/idle link styles (light + dark)
  const activeLink =
    "text-blue-600 dark:text-blue-400 font-semibold md:border-b-2 md:border-blue-600 dark:md:border-blue-400";
  const baseLink =
    "flex items-center gap-2  hover:text-blue-600 dark:hover:text-blue-400 transition";

  return (
    <header className="sticky top-0 z-40 bg-base-100/90 backdrop-blur border-b border-gray-100 dark:border-gray-800">
      <div className="navbar max-w-7xl mx-auto">
        {/* Left: Brand + Mobile toggle */}
        <div className="navbar-start">
          <button
            aria-label="Open menu"
            className="btn btn-ghost lg:hidden"
            onClick={() => setMobileOpen((s) => !s)}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h12M4 18h16" />
            </svg>
          </button>

          <Link
            to="/"
            className="font-semibold md:text-lg flex items-center gap-2"
          >
            <SiTemporal className="text-green-500 md:h-7 md:w-7" />
            <span>Lost &amp; Found</span>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-6">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? activeLink : ""}`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Theme toggle + User */}
        <div className="navbar-end gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            aria-pressed={theme === "dark"}
            className="btn btn-ghost btn-circle"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <FiSun className="h-5 w-5 text-yellow-400" />
            ) : (
              <FiMoon className="h-5 w-5" />
            )}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring-1 ring-gray-200 dark:ring-gray-700">
                  <Link to="/">
                    {avatarSrc ? (
                      <img
                        className="rounded-full h-10 w-10 object-cover"
                        src={avatarSrc}
                        alt="User avatar"
                      />
                    ) : (
                      <div className="h-10 w-10 flex items-center justify-center">
                        <FaUserCircle className="h-7 w-7 text-gray-500 dark:text-gray-400" />
                      </div>
                    )}
                  </Link>
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-56 p-2 shadow z-[1]"
              >
                <li className="px-2 py-2">
                  <div className="text-sm">
                    <div className="font-semibold">{displayName}</div>
                    <div className="text-gray-500">{user?.email}</div>
                  </div>
                </li>
                <li>
                  <Link to="/addItems">
                    <FiPlusCircle className="h-4 w-4" />
                    Add Lost &amp; Found
                  </Link>
                </li>
                <li>
                  <Link to="/recoverItems">
                    <FiCheckCircle className="h-4 w-4" />
                    My Recovered Items
                  </Link>
                </li>
                <li>
                  <Link to="/myItems">
                    <FiList className="h-4 w-4" />
                    My Items
                  </Link>
                </li>
                <li>
                  <Link to="/userInfo">
                    <FiSettings className="h-4 w-4" />
                    Settings
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogOut} className="text-red-600">
                    <FiLogOut className="h-4 w-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-sm md:btn-md bg-blue-600 text-white border-0 hover:opacity-90">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-gray-800">
          <ul className="menu p-3 gap-2">
            {navItems.map((item) => (
              <li key={item.to} onClick={() => setMobileOpen(false)}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? activeLink : ""}`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ToastContainer position="top-center" />
    </header>
  );
};

export default Navbar;
