import React from 'react';
import { useEffect, useState } from "react";
import { Link } from 'react-router';

const Data_Show_Home_Page = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/itemsAll")
            .then(res => res.json())
            .then(data => {
                // Sort by date descending (most recent first)
                const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setItems(sorted.slice(0, 6));
                console.log(data)
            });
    }, []);
    return (
        <div className="max-w-5xl mx-auto px-4 md:mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Latest 6 Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-lg shadow p-4 flex flex-col items-center border border-gray-200"
                    >
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-44 object-cover rounded mb-3"
                        />
                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm mb-1">
                            <span className="font-medium">Type:</span> {item.postType}
                        </p>
                        <p className="text-sm mb-1">
                            <span className="font-medium">Category:</span> {item.category}
                        </p>
                        <p className="text-sm mb-1">
                            <span className="font-medium">Location:</span> {item.location}
                        </p>
                        <p className="text-sm mb-1">
                            <span className="font-medium">Date:</span> {item.date}
                        </p>
                        <p className="text-sm mb-2">{item.description}</p>
                        <p className="text-xs text-gray-500">
                            <span className="font-medium">Posted by:</span> {item.displayName || item.email}
                        </p>
                    </div>
                ))}
            </div>
            <div className='grid  justify-items-center'> <Link className='btn btn-primary my-5' to={'/postItems'}>Show more</Link></div>
        </div>
    );
};

export default Data_Show_Home_Page;


// {
//     "_id": "684f115c2e895bcf2805ef1c",
//     "postType": "Found",
//     "thumbnail": "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
//     "title": "JImssd",
//     "description": "dfgg",
//     "category": "pets",
//     "location": "Chittgong",
//     "date": "2025-06-28",
//     "displayName": null,
//     "email": "sajjadjim@gmail.com"
// }