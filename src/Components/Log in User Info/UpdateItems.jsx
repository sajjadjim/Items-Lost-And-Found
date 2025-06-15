import React, { use, useEffect } from 'react';
import { AuthContext_File } from '../../Authcontext/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router';

const UpdateItems = () => {
    const { _id, date, postType, title, description, category, location, thumbnail } = useLoaderData();
    // console.log(_id , email , date , postType , title , description , category , location , thumbnail   )

    const { user } = use(AuthContext_File)
    useEffect(() => {
        document.title = "Update | Item";
    }
    )

    // New Task Add here code 
    const handleAddNewItem = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const updateItem = Object.fromEntries(formData.entries());

        // Include dynamic user info in task data
        updateItem.displayName = user.displayName;
        updateItem.email = user.email;
        console.log(updateItem);
        //    Here the Data send to the Data Base Code 
        axios.put(`http://localhost:3000/itemsAll/${_id}`, updateItem)
            .then((response) => {
                if (response.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Item Update successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                }
            })
            .catch((error) => {
                console.error('Error adding item:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while adding the item. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        // Reset the form after submission  
        // form.reset();
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 py-10">
            <form onSubmit={handleAddNewItem} className="w-full max-w-lg mx-auto p-8 bg-white/90 rounded-2xl shadow-2xl border border-blue-200 space-y-6 backdrop-blur">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-4 drop-shadow">Update Items</h2>
                <div>
                    <label className="block mb-1 font-semibold text-blue-700">Post Type</label>
                    <select
                        name="postType"
                        className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                        defaultValue={postType}
                    >
                        <option value="Lost">Lost</option>
                        <option value="Found">Found</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-blue-700">Thumbnail (Image URL)</label>
                    <input
                        type="url"
                        name="thumbnail"
                        className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                        placeholder="https://example.com/image.jpg"
                        defaultValue={thumbnail}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-blue-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                        placeholder="Item title"
                        defaultValue={title}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-blue-700">Description</label>
                    <textarea
                        name="description"
                        className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows={3}
                        required
                        placeholder="Describe the item..."
                        defaultValue={description}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-blue-700">Category</label>
                    <select
                        name="category"
                        className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                        defaultValue={category}
                    >
                        <option value="">Select Category</option>
                        <option value="pets">Pets</option>
                        <option value="documents">Documents</option>
                        <option value="gadgets">Gadgets</option>
                        <option value="others">Others</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-blue-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                        placeholder="Where was it lost/found?"
                        defaultValue={location}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-blue-700">Date Lost or Found</label>
                    <input
                        type="date"
                        name="date"
                        className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                        defaultValue={date}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-blue-700">Contact Information</label>
                    <input
                        type="text"
                        name="displayName"
                        className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 mb-2 bg-gray-100"
                        defaultValue={user.displayName}
                        readOnly
                    />
                    <input
                        type="email"
                        defaultValue={user.email}
                        name="email"
                        className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 bg-gray-100"
                        readOnly
                    />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-pink-400 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-pink-500 transition-all duration-200">
                    Update Post
                </button>
                <div className='grid '><Link className='w-full bg-gradient-to-r from-blue-500 to-pink-400 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-pink-500 transition-all duration-200 text-center ' to={'/myItems'}>Back</Link></div>
            </form>
        </div>
    );
};

export default UpdateItems;