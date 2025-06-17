import React, { use } from 'react';
import { AuthContext_File } from '../../Authcontext/AuthProvider';
import { useEffect, useState } from 'react';
import Recover_Single_Item from './Recover_Single_Item';
// import { data } from 'react-router';

const RecoverItems = () => {
    const { user } = use(AuthContext_File)
    // console.log("Recover Page " , user.email)

    const [items, setItems] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://b11a11-server-side-sajjadjim.vercel.app/recoverItems?email=${user.email}`)
                .then(res => res.json())
                .then(data => setItems(data))
                .catch(err => console.error(err));
        }
    }, [user?.email]);

    // console.log(items)
    const [viewMode, setViewMode] = useState('card');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (user?.email) {
            fetch(`https://b11a11-server-side-sajjadjim.vercel.app/recoverItems?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setItems(data);
                    setTimeout(() => setLoading(false), 1000);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [user?.email]);

    // Spinner for table view switch
    const handleViewMode = (mode) => {
        if (mode === 'table' && viewMode !== 'table') {
            setLoading(true);
            setViewMode(mode);
            setTimeout(() => setLoading(false), 1000);
        } else if (mode === 'card' && viewMode !== 'card') {
            setViewMode(mode);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-4 flex gap-2">
                <button
                    className={`px-4 py-2 rounded ${viewMode === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleViewMode('card')}
                >
                    Card View
                </button>
                <button
                    className={`px-4 py-2 rounded ${viewMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleViewMode('table')}
                >
                    Table View
                </button>
            </div>
            {viewMode === 'card' ? (
                <div className='grid md:grid-cols-3 gap-5 grid-cols-1 justify-items-center'>
                    {items.map(item => (
                        <Recover_Single_Item item={item} key={item._id} />
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Recover Date</th>
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
                                    <td>{item.location}</td>
                                    <td>{item.date}</td>
                                    <td>{item.recoveryDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RecoverItems;





