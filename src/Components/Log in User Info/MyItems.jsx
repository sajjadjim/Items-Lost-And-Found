import React, { use } from 'react';
import Single_item from '../All Items List View/Single_item';


const MyItems = ({ myPostedItemsPriomise }) => {
    const items = use(myPostedItemsPriomise);
    // console.log(items)

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.title}</div>
                                            <div className="text-sm opacity-50">{item.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.category}</td>
                                <td>{item.location}</td>
                                <td>{item.date}</td>
                                <td>
                                    <button className="btn btn-primary btn-xs mr-2">Update</button>
                                    <button className="btn btn-error btn-xs">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyItems;


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