import React from 'react';
import Navbar from '../Home/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Home/Footer/Footer';

const MainLayouts = () => {
    return (
        <div>
            {/* <Navbar></Navbar> */}
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;