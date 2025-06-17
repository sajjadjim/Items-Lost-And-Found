import React from 'react';

const Single_item = ({ item }) => {
    const { email, postType , thumbnail , description , date , location , category} = item;
    // console.log(email)

    return (
        <div className="flex justify-center items-center py-6">
            <div className="card bg-white w-96 shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <figure className="relative">
                    <img
                        src={thumbnail}
                        alt={item.title}
                        className="w-full h-56 object-cover"
                    />
                    <span
                        className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                            postType === 'Found'
                                ? 'bg-green-500 text-white'
                                : postType === 'Lost'
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-400 text-white'
                        }`}
                    >
                        {postType}
                    </span>
                </figure>
                <div className="card-body p-5">
                    <h2 className="card-title text-lg font-bold mb-2">{item.title || "Untitled"}</h2>
                    <p className="text-gray-600 mb-3">{description}</p>
                    <ul className="mb-4 text-sm text-gray-500 space-y-1">
                        <li>
                            <span className="font-semibold">Category:</span> {category}
                        </li>
                        <li>
                            <span className="font-semibold">Location:</span> {location}
                        </li>
                        <li>
                            <span className="font-semibold">Date:</span> {date}
                        </li>
                        <li>
                            <span className="font-semibold">Posted by:</span> {email}
                        </li>
                    </ul>
                    <div className="card-actions flex justify-between">
                        <div className="badge badge-outline">{item.category}</div>
                        <div className="badge badge-outline">{postType}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Single_item;


// {
//     "_id": "684efa33f33332e2bd614cf8",
//     "postType": "Found",
//     "thumbnail": "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
//     "title": "jiui",
//     "description": "tgg",
//     "category": "pets",
//     "location": "Dhaka",
//     "date": "2025-06-12",
//     "displayName": null,
//     "email": "sajjadjim@gmail.com"
// }