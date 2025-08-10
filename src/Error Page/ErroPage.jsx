import React from 'react';
import errorAnimation from '../../public/404Page.json';
import Lottie from 'lottie-react';

const ErroPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-red-400 via-pink-500 to-purple-600 text-white px-4 text-center">
            <div className="w-full max-w-xl">
                <Lottie className="w-full" animationData={errorAnimation} loop={true} />
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-widest drop-shadow-lg mt-4 mb-2 animate-bounce">
                404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 drop-shadow">
                Page Not Found
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-md mx-auto opacity-90">
                Oops! The page you are looking for doesn't exist or has been moved.<br />
                Try going back to the homepage.
            </p>
            <a
                href="/"
                className="inline-block px-8 py-3 rounded-full bg-white text-red-500 font-bold shadow-lg transition-all duration-200 hover:bg-red-500 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
            >
                Go Home
            </a>
        </div>
    );
};

export default ErroPage;
