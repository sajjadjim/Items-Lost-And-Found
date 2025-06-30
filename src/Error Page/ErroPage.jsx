import React from 'react';
import errorAnimation from '../../public/404Page.json';
import Lottie from 'lottie-react';

const ErroPage = () => {
    return (
        <div className="md:min-h-screen flex flex-col justify-center items-center  text-white md:px-4  text-center">
            <Lottie className="md:w-full md:max-w-xl" animationData={errorAnimation} loop={true} />
            {/* <h1 className="md:text-8xl text-3xl font-bold tracking-widest m-0">404</h1> */}
            <a
                href="/"
                className="md:px-8 px-2 py-1 md:py-3 rounded-full bg-white text-red-500 font-bold shadow-md transition-colors duration-200 hover:bg-red-500 hover:text-white"
            >
                Go Home
            </a>
            {/* <h2 className="text-2xl font-medium  mb-5">Page Not Found</h2> */}
            <p className="md:text-lg md:pb-2 max-w-md">
                Oops! The page you are looking for doesn't exist or has been moved.
            </p>
        </div>
    );
};

export default ErroPage;
