import React, { use } from 'react';
import { AuthContext_File } from '../../Authcontext/AuthProvider';

const User_info = () => {
    const { user } = use(AuthContext_File);
    return (
        <div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto mt-20">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
                    <img
                        src={user?.photoURL || "https://ui-avatars.com/api/?name=User"}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="text-xl font-semibold mb-2">{user?.displayName || "No Name"}</h2>
                <p className="text-gray-600 mb-1">{user?.email || "No Email"}</p>
                <p className="text-gray-400 text-sm">ID: {user?.uid || "No ID"}</p>
            </div>
        </div>
    );
};

export default User_info;