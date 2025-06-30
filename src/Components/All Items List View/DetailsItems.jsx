import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router';

const DetailsItems = () => {
    const data = useLoaderData();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    const { email, postType, thumbnail, description, date, location, category } = data;

    return (
        <div>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-8">
                <img
                    src={thumbnail}
                    alt={category}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">{postType}</span>
                        <span className="text-xs text-gray-500">{new Date(date).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 capitalize">{category}</h2>
                    <p className="text-gray-700 mb-4">{description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>
                            <span className="font-semibold">Location:</span> {location}
                        </span>
                        <span>
                            <span className="font-semibold">Posted by:</span> {email}
                        </span>
                    </div>
                </div>
                <div className='grid justify-items-center my-10'>
                    <Link to={'/postItems'} className='btn btn-primary bg-blue-500'>Back</Link>
                </div>
            </div>
        </div>
    );
};

export default DetailsItems;