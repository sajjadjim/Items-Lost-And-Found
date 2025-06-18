import React, { use, useEffect } from 'react';
import { AuthContext_File } from '../../Authcontext/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

const Add_item = () => {
    const [dbUser, setDbUser] = React.useState(null);
    const { user } = use(AuthContext_File)
    // console.log("User name " , user)
    useEffect(() => {
        document.title = "Add | Item";
    }
    )

    // New Task Add here code 
    const handleAddNewItem = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const taskData = Object.fromEntries(formData.entries());

        // Include dynamic user info in task data
        taskData.displayName = user.displayName;
        taskData.email = user.email;
        // console.log(taskData);

        axios.post('https://b11a11-server-side-sajjadjim.vercel.app/itemsAll', taskData)
            .then((response) => {
                if (response.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Item added successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to add item. Please try again.',
                        icon: 'error',
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
        form.reset();
    };

        React.useEffect(() => {
            if (!user?.email) return;
            const accessToken = user?.accessToken;
            fetch(`https://b11a11-server-side-sajjadjim.vercel.app/users?email=${encodeURIComponent(user.email)}` ,{
                headers: {
                authorization: `Bearer ${accessToken}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data) && data.length > 0) {
                        setDbUser(data[0]);
                    }
                })
                .catch(() => {});
        }, [user?.email]);
        const displayUserName =dbUser?.name || user?.displayName;

        console.log(displayUserName)
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 py-10">
            <form onSubmit={handleAddNewItem} className="w-full max-w-4xl mx-auto p-8 bg-white/90 rounded-2xl shadow-2xl border border-blue-200 space-y-6 backdrop-blur">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-4 drop-shadow">Add Lost &amp; Found Item</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-1 font-semibold text-blue-700">Post Type</label>
                        <select name="postType" className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                            <option value="Lost">Lost</option>
                            <option value="Found">Found</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-blue-700">Thumbnail (Image URL)</label>
                        <input type="url" name="thumbnail" className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required placeholder="https://example.com/image.jpg" />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-blue-700">Title</label>
                        <input type="text" name="title" className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required placeholder="Item title" />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-blue-700">Category</label>
                        <select name="category" className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                            <option value="">Select Category</option>
                            <option value="pets">Pets</option>
                            <option value="documents">Documents</option>
                            <option value="gadgets">Gadgets</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-semibold text-blue-700">Description</label>
                        <textarea name="description" className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" rows={3} required placeholder="Describe the item..." />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-blue-700">Location</label>
                        <input type="text" name="location" className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required placeholder="Where was it lost/found?" />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-blue-700">Date Lost or Found</label>
                        <input type="date" name="date" className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-blue-700">Your Name</label>
                        <input type="text" name="displayName" className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 bg-gray-100" defaultValue={displayUserName} readOnly  />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-blue-700">Your Email</label>
                        <input type="email" defaultValue={user.email} name="email" className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 bg-gray-100" readOnly />
                    </div>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-pink-400 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-pink-500 transition-all duration-200">
                    Add Post
                </button>
            </form>

        </div>
    );
};

export default Add_item;