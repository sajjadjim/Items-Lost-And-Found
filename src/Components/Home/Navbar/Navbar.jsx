import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { NavLink } from 'react-router';
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { SiTemporal } from "react-icons/si";
import { AuthContext_File } from '../../../Authcontext/AuthProvider';

const Navbar = () => {
    const [dbUser, setDbUser] = useState([])
    const { user, logOut } = use(AuthContext_File)

    const handleLogOut = () => {
        logOut().then(() => {
        }).catch((error) => {
            console.log(error)
        })
        toast("Logout successfully Done ❌");
    }

    // Filter Data From the Database From  userDatabase Information  Show the name
    useEffect(() => {
        const accessToken = user?.accessToken;
        if (accessToken) {
            fetch('https://b11a11-server-side-sajjadjim.vercel.app/users',
                {
                    headers: {
                        authorization: `Bearer ${accessToken}`
                    }
                }
            )
                .then(res => res.json())
                .then(data => {
                    setDbUser(data);
                    // console.log(data)
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        }
    }, []);

    
    const currentUser = dbUser.filter(db => db.email === user?.email)
    // const displayName =  dbUser.name 
    // console.log(dbUser)

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
                        <NavLink to='/addItems'><li>Add Lost & Found</li></NavLink>
                        <NavLink to='/postItems'><li>Post items</li></NavLink>
                        <NavLink to='/FaQ'> <li>FaQ</li></NavLink>
                        <NavLink to='/aboutUs'> <li>About Us</li></NavLink>
                        <NavLink to='/contact'><li>Contact</li></NavLink>
                    </ul>
                </div>
                <a className="font-semibold text-lg flex  items-center gap-1"><SiTemporal className='text-green-500 md:h-8 md:w-8' />Lost and Found Website</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-5">
                    <NavLink to='/'><li>Home</li></NavLink>
                    <NavLink to='/addItems'><li>Add Lost & Found</li></NavLink>
                    <NavLink to='/postItems'><li>Post items</li></NavLink>
                    <NavLink to='/FaQ'> <li>FaQ</li></NavLink>
                    <NavLink to='/aboutUs'> <li>About Us</li></NavLink>
                    <NavLink to='/contact'><li>Contact</li></NavLink>
                </ul>
            </div>
            <div className="navbar-end">
                {/* Theme control part work here  */}

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
                                                    : ""
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
