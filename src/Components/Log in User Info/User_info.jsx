import React, { use } from 'react';
import { AuthContext_File } from '../../Authcontext/AuthProvider';

const User_info = () => {
    const { user } = use(AuthContext_File);
    const [dbUser, setDbUser] = React.useState(null);

    React.useEffect(() => {
        if (!user?.email) return;
        fetch(`http://localhost:3000/users?email=${encodeURIComponent(user.email)}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setDbUser(data[0]);
                }
            })
            .catch(() => {});
    }, [user?.email]);

    const displayName = user?.displayName || dbUser?.name || "No Name";
    const photoURL = user?.photoURL || dbUser?.photoUrl || "https://ui-avatars.com/api/?name=User";
    const email = user?.email || dbUser?.email || "No Email";
    const uid = user?.uid || dbUser?._id || "No ID";

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
            </div>
        </div>
    );
};

export default User_info;