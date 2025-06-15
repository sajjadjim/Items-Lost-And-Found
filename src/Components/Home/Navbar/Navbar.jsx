import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { NavLink } from 'react-router';
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { GiHummingbird } from "react-icons/gi";
import { AuthContext_File } from '../../../Authcontext/AuthProvider';

const Navbar = () => {
    const [dbUser, setDbUser] = useState([])
    const { user, logOut } = use(AuthContext_File)

    //  Theme control Button Add Here 
    const [theme, setTheme] = useState("light"); // or "dark"

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };


    const handleLogOut = () => {
        logOut().then(() => {
        }).catch((error) => {
            console.log(error)
        })
        toast("Logout successfully Done ❌");
    }

    // Filter Data From the Database From  userDatabase Information  Show the name
    useEffect(() => {
        fetch('https://frelancer-server.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                setDbUser(data);
            })
    }, []);

    const currentUser = dbUser.filter(db => db.email === user?.email)

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-3">
                        <NavLink to='/'><li>Home</li></NavLink>
                        <NavLink to='/addItems'><li>Add Task</li></NavLink>
                        <NavLink to='/browseTask'><li>Browse Tasks</li></NavLink>
                        <NavLink to='/myPostedTask'><li>My Posted Tasks</li></NavLink>
                        <NavLink to='/about'> <li>About Us</li></NavLink>
                        <NavLink to='/reviewForm'> <li>Rate Us</li></NavLink>
                    </ul>
                </div>
                <a className="font-semibold text-lg flex  items-center gap-1"><GiHummingbird className='text-green-500 md:h-8 md:w-8' />Lost and Found Website</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-5">
                    <NavLink to='/'><li>Home</li></NavLink>
                    <NavLink to='/addItems'><li>Add Lost & Found</li></NavLink>
                    <NavLink to='/postItems'><li>Post items</li></NavLink>
                    {/* <NavLink to='/myPostedTask'><li>My Posted Tasks</li></NavLink>
                    <NavLink to='/about'> <li>About Us</li></NavLink>
                    <NavLink to='/reviewForm'> <li>Rate Us</li></NavLink> */}
                </ul>
            </div>
            <div className="navbar-end">
                {/* Theme control part work here  */}
                <div className=" transition-colors duration-300 mr-5">
                    {/* Theme Toggle Switch */}
                    <label className="swap swap-rotate cursor-pointer">
                        {/* Hidden checkbox controls the state */}
                        <input
                            type="checkbox"
                            onChange={toggleTheme}
                            checked={theme === "synthwave"}
                        />
                        {/* Sun icon (light mode) */}
                        <svg
                            className="swap-off h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* Moon icon (dark mode / synthwave) */}
                        <svg
                            className="swap-on h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                </div>
                <div className="relative group">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <Link tabIndex={0} role="button" to='/'>
                                    {user && user.photoURL ? (
                                        <img className='rounded-full h-8 w-8 mx-1 cursor-pointer' src={user.photoURL} alt="User" />
                                    ) : (
                                        <FaUserCircle className='h-8 w-8 mx-1 cursor-pointer' />
                                    )}
                                </Link>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><Link to='/addItems'>Add Lost & Found Item</Link></li>
                            <li><Link to='/recoverIems'>My Recovered Items </Link></li>
                            <li><Link to='/myItems'>My Items</Link></li>
                             <li><Link to='/userInfo'>Setting</Link></li>
                            <li>{
                                user ? <Link onClick={handleLogOut} className='' to='/login'><button className=""> Logout</button></Link> :
                                    <Link className='' to='/login'><button className=""> Login</button></Link>
                            }</li>
                        </ul>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute -left-4/5 -translate-x-1/2 mt-2 w-max px-3 py-2 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                        {user ? (
                            <div>
                                <div>
                                    {
                                        user.displayName
                                            ? user.displayName
                                            : (
                                                currentUser.length > 0 && currentUser[0].name
                                                    ? currentUser[0].name
                                                    : "no name"
                                            )
                                    }
                                </div>
                                <div>{user.email || "No Email"}</div>
                            </div>
                        ) : (
                            <div>Not logged in</div>
                        )}
                    </div>
                </div>
                {
                    user ? <Link onClick={handleLogOut} className='flex justify-center items-center gap-1' to='/login'><button> </button></Link> :
                        <Link className='flex justify-center items-center gap-1' to='/login'><button className="btn"> Login</button></Link>
                }
            </div>
        </div>
    );
};

export default Navbar;