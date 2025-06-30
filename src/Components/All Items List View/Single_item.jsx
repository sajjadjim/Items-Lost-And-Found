import React, { use, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext_File } from '../../Authcontext/AuthProvider';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Swal from 'sweetalert2';

const Single_item = ({ item }) => {
    const { user } = use(AuthContext_File)
    const { email, postType, thumbnail, description, date, location, category, _id, title } = item;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [modalDate, setModalDate] = useState(date ? new Date(date) : new Date());


    //  Recover items Add To the Database code here
    // -----------------------------------------------------------------------------------
    const handleRecoverItem = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Add extra info from state/props
        data.itemId = _id;
        data.recoveryDate = modalDate;
        data.userEmail = user.email;
        data.location = e.target.location?.value || location;
        data.date = new Date().toISOString().split('T')[0];
        data.title = title;
        data.thumbnail = thumbnail;

        axios.post('https://b11a11-server-side-sajjadjim.vercel.app/recoverItems', data)
            .then(res => {
                if (res.data && res.data.insertedId) {
                    import('sweetalert2').then(Swal => {
                        Swal.default.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Item recovery info submitted successfully.',
                            timer: 2000,
                            showConfirmButton: false,
                        }).then(() => {
                            window.location.reload();
                        });
                    });
                }
            })
            .catch(err => {
                import('sweetalert2').then(Swal => {
                    Swal.default.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to submit recovery info.',
                    });
                });
                console.error(err);
            });
        // console.log(newJob)
        e.target.reset(); // Reset form

    }

    // Directed the Database Update for code write here 
    // ----------------------------------------------------------------------
    const handdleAllItemsDatabase = (e) => {
        e.preventDefault()
        const postType = e.target.recoveryStatus.value
        console.log("Post type here ", postType, _id)
        fetch(`https://b11a11-server-side-sajjadjim.vercel.app/itemsAll/${item._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postType }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.insertedId) {
                    import('sweetalert2').then(Swal => {
                        Swal.default.fire({
                            title: 'Success!',
                            text: 'Item Update successfully!',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                    });
                }
            })
            .catch(error => {
                console.error('Error adding item:', error);
                import('sweetalert2').then(Swal => {
                    Swal.default.fire({
                        title: 'Error!',
                        text: 'An error occurred while adding the item. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
            });
        // Reset the form after submission  
        // form.reset();

    }


    return (
        <div className="flex justify-center items-center py-6">
            <div className="card  w-96 shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <figure className="relative">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-56 object-cover"
                    />
                    <span
                        onClick={postType === 'recovered' ? undefined : openModal}
                        className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${postType === 'Found'
                            ? 'bg-green-500 text-white'
                            : postType === 'Lost'
                                ? 'bg-red-500 text-white'
                                : postType === 'recovered'
                                    ? ' opacity-60 cursor-not-allowed'
                                    : ''
                            }`}
                        style={postType === 'recovered' ? { pointerEvents: 'none', opacity: 0.6 } : {}}
                        title={postType === 'recovered' ? 'Already recovered' : ''}
                    >
                        {postType}
                    </span>
                </figure>
                <div className="card-body p-5">
                    <h2 className="card-title text-lg font-bold mb-2">{title || "Untitled"}</h2>
                    <p className=" mb-3">{description}</p>
                    <ul className="mb-4 text-sm  space-y-1">
                        <li><span className="font-semibold">Category:</span> {category}</li>
                        <li><span className="font-semibold">Location:</span> {location}</li>
                        <li><span className="font-semibold">Date:</span> {date}</li>
                        <li><span className="font-semibold">Posted by:</span> {email}</li>
                    </ul>
                    <div className="card-actions flex justify-between">
                        <div className="badge badge-outline">{category}</div>
                        <div className="badge badge-outline">{postType}</div>
                    </div>
                </div>
                <div className='grid justify-items-center my-5'>
                    <Link to={`/detailsItem/${_id}`} className='btn border-0 bg-blue-500'>View Details</Link>
                </div>
            </div>

            {/* Modal as a Form */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-black/30">
                    <form
                        className=" border border-gray-200 shadow-2xl rounded-2xl p-6 w-96 relative animate-fade-in-up"
                        onSubmit={(e) => { handleRecoverItem(e); closeModal(); handdleAllItemsDatabase(e) }}
                    >
                        <button
                            type="button"
                            onClick={closeModal}
                            className="absolute top-2 right-3  hover:text-red-500 text-xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-center ">{postType} Item Info</h2>
                        <div className="space-y-3  text-sm">
                            <div>
                                <label className="font-semibold block mb-1">Title</label>
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                    value={title}
                                    readOnly
                                    name="title"
                                />
                            </div>
                            <div>
                                <label className="font-semibold block mb-1">Location</label>
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                    name="location"
                                    defaultValue=""
                                />
                            </div>
                            <div>
                                <label className="font-semibold block mb-1">Recovery Status</label>
                                <select
                                    className="w-full border rounded px-3 py-2"
                                    name="recoveryStatus"
                                    required
                                >
                                    <option value="" disabled>Select recovery status</option>
                                    <option value="recovered">Recovered</option>
                                    <option value="not_recovered">Not Recovered</option>/
                                </select>
                            </div>
                            <div>
                                <label className="font-semibold block mb-1">Date</label>
                                <DatePicker
                                    selected={modalDate}
                                    onChange={date => setModalDate(date)}
                                    className="w-full border rounded px-3 py-2"
                                    dateFormat="yyyy-MM-dd"
                                />
                            </div>
                            <div>
                                <label className="font-semibold block mb-1">Posted by</label>
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                    value={user.email}
                                    readOnly
                                    name="userEmail"
                                />
                            </div>
                        </div>
                        <div className="text-center mt-6">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                            >
                                Recover Item
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Single_item;
