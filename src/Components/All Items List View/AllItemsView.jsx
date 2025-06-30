import React, { useEffect, useState } from 'react';
import Single_item from './Single_item';
import { IoSearch } from "react-icons/io5";

const AllItemsView = () => {

    const [items, setAllItems] = useState([]);
    // Define a state for loading data 
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://b11a11-server-side-sajjadjim.vercel.app/itemsAll')
            .then(res => res.json())
            .then(data => {
                setAllItems(data);
                setLoading(false);
                // console.log(data)
            })
            .catch(error => {
                console.error("Error fetching jobs:", error);
                setLoading(false);
            });
    }, []);

    // Data Loading Button ADD 
    if (loading) {
        return <div className='flex justify-center items-center h-screen'>
            {/* loading button add here  */}
            <button className="btn loading">loading</button>
        </div>
    }


    // Filter items by title or location
    const filteredItems = items.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='flex justify-center items-center flex-col'>
            <div className="relative md:w-1/2 w-9/10 mb-6">
                <input
                    type="text"
                    placeholder="Search by title or location"
                    className="input input-bordered w-full pr-10 rounded-4xl mt-5"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 mt-[10px]">
                    <IoSearch size={20} />
                </span>
            </div>
            <p className='md:text-4xl text-2xl font-bold'>All Items</p>
            <div className="grid md:grid-cols-3 gap-4 p-4 grid-cols-1 w-10/12">
                {
                    filteredItems.map(item => <Single_item item={item} key={item._id}></Single_item>)
                }
            </div>
        </div>
    );
};

export default AllItemsView;