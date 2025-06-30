import React from 'react';
import Navbar from '../Home/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Home/Footer/Footer';

const MainLayouts = () => {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
                <Navbar />
            </div>
            <div style={{ flex: 1 }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayouts;