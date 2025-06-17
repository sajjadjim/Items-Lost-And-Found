import React, { useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router';
import Carousel from './Components/Carousel';
import Data_Show_Home_Page from './Components/Data_Show_Home_Page';
import NumberofUserWebsite from './Components/NumberofUserWebsite';

const Home = () => {
    useEffect(() => {
        document.title = 'Home | Page';
    }, []);
    return (
        <div className="w-full flex flex-col items-center bg-gradient-to-b from-blue-50 to-white">
            <div className="w-full max-w-6xl">
                <Carousel />
            </div>
            <div className="hero bg-base-200 min-h-screen w-full flex justify-center">
                <div className="hero-content flex-col lg:flex-row items-center w-full max-w-6xl">
                    <img
                        src="https://www.247software.com/hubfs/lost-and-found-software.png"
                        className="md:max-w-xl w-full rounded-lg shadow-2xl object-cover"
                        alt="Work from home"
                    />
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left px-6">
                        <h1 className="md:text-5xl text-3xl font-bold mb-4">
                            Lost and Found Website{' '}
                            <span style={{ fontWeight: 'bold', marginTop: '50px', textAlign: 'center' }}>
                                <span style={{ color: 'blue' }}>
                                    <Typewriter
                                        words={['Add Items', 'Views Items', 'Update Items', 'Find / Help Others']}
                                        loop={0}
                                        cursor
                                        cursorStyle="|"
                                        typeSpeed={50}
                                        deleteSpeed={50}
                                        delaySpeed={2000}
                                    />
                                </span>
                            </span>
                        </h1>
                        <p className="py-6 max-w-xl text-gray-600">
                            As a freelancer or entrepreneur, starting your business is like planting a seed. It takes plenty of time and money. Then you have to nurture it without knowing when the tree will finally take root and provide for you in return. It could be tough but when your gig starts to flourish, it makes all the hard work and dedication worth it.
                        </p>
                        <button className="btn btn-primary px-8 py-3 rounded-full shadow-lg">Get Started</button>
                    </div>
                </div>
            </div>
            {/* show 6 data in the home page */}
            <div className="w-full max-w-6xl mx-auto my-8">
                <Data_Show_Home_Page />
            </div>

           <div>
             <NumberofUserWebsite></NumberofUserWebsite>
           </div>
        </div>
    );
};

export default Home;