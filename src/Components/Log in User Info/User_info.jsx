import React, { use } from 'react';
import { AuthContext_File } from '../../Authcontext/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

const User_info = () => {
    const { user } = use(AuthContext_File);
    const [dbUser, setDbUser] = React.useState(null);

    React.useEffect(() => {
        if (!user?.email) return;
        const accessToken = user?.accessToken;
        fetch(`https://b11a11-server-side-sajjadjim.vercel.app/users?email=${encodeURIComponent(user.email)}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        },
        )
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setDbUser(data[0]);
                }
            })
            .catch(() => { });
    }, [user?.email]);

    const displayName = user?.displayName || dbUser?.name || "No Name";
    const photoURL = user?.photoURL || dbUser?.photoUrl || "https://ui-avatars.com/api/?name=User";
    const email = user?.email || dbUser?.email || "No Email";
    const uid = user?.uid || dbUser?._id || "No ID";

    const [showForm, setShowForm] = React.useState(false);

    // update User Information to the server side 
    // Show updated information in the console after form submission
    const handleUpdateUserInformation = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedUser = {
            name: form.name.value,
            photoUrl: form.photoUrl.value,
            email: form.email.value,
            password: form.password.value,
        };
        // console.log("Updated User Information:", updatedUser);
        axios
            .put(
                `https://b11a11-server-side-sajjadjim.vercel.app/users/${dbUser?._id || user?.uid}`,
                updatedUser,
                {
                    headers: {
                        authorization: `Bearer ${user.accessToken}`,
                    },
                }
            )
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Success", "User information updated!", "success");
                    setDbUser((prev) => ({ ...prev, ...updatedUser }));
                    setShowForm(false);
                } else {
                    Swal.fire("Info", "No changes were made.", "info");
                }
                console.log("Updated User Information:", res.data);
            })
            .catch((err) => {
                Swal.fire("Error", "Failed to update Google user information.", "error");
                console.error(err);
            });
    };

    return (
        <div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto mt-20">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
                    <img
                        src={photoURL}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="text-xl font-semibold mb-2">{displayName}</h2>
                <p className="text-gray-600 mb-1">{email}</p>
                <p className="text-gray-400 text-sm">ID: {uid}</p>
                <button
                    className="mt-4 bg-blue-500 text-white rounded py-2 px-4 font-semibold hover:bg-blue-600"
                    onClick={() => setShowForm((prev) => !prev)}
                >
                    {showForm ? "Close Update Form" : "Update"}
                </button>
            </div>
            {showForm && (
                <div className="mt-8 w-full max-w-sm mx-auto">
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleUpdateUserInformation}
                    >
                        <label className="flex flex-col">
                            <span className="mb-1 font-medium">Name</span>
                            <input
                                name="name"
                                defaultValue={dbUser?.name || user?.displayName || ""}
                                className="border rounded px-3 py-2"
                                
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-1 font-medium">Photo URL</span>
                            <input
                                name="photoUrl"
                                defaultValue={dbUser?.photoUrl || user?.photoURL || ""}
                                className="border rounded px-3 py-2"
                                
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-1 font-medium">Email</span>
                            <input
                                name="email"
                                type="email"
                                defaultValue={dbUser?.email || user?.email || ""}
                                className="border rounded px-3 py-2"
                                
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="mb-1 font-medium">Password</span>
                            <input
                                name="password"
                                type="password"
                                defaultValue={dbUser?.password || ""}
                                className="border rounded px-3 py-2"
                                
                            />
                        </label>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded py-2 font-semibold hover:bg-blue-600"
                        >
                            Update Infomation
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default User_info;