import React, { use } from 'react';
import Single_item from '../All Items List View/Single_item';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import noData from '../../../public/noFounfItems.json'
import Lottie from 'lottie-react';

const MyItems = ({ myPostedItemsPriomise }) => {
    const items = use(myPostedItemsPriomise);
    // console.log(items)

    // delete item Here by usinng ID parameter use 
    const handleDeleteItem = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`https://b11a11-server-side-sajjadjim.vercel.app/itemsAll/${id}`, {
                    method: "DELETE",
                });
                if (res.ok) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                        icon: "success"
                    });
                    window.location.reload();
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the item.",
                        icon: "error"
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong.",
                    icon: "error"
                });
                alert(error.message);
            }
        }
    };

    if (!items || items.length === 0) {
        return (
            <div className="text-center mt-10 text-lg grid justify-center font-semibold text-gray-500">
                No items found. You not yet added any data to the database.
                <Lottie className='w-100' animationData={noData} loop={true}></Lottie>
            </div>
        );
    }

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
                                    <Link to={`/updateItems/${item._id}`} className="btn btn-primary btn-xs mr-2">Update</Link>
                                    <button onClick={() => handleDeleteItem(item._id)} className="btn btn-error btn-xs">Delete</button>
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