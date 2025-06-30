import React from 'react';

const Recover_Single_Item = ({item}) => {
       const {  postType, thumbnail,  date, location, category, recoveryDate , title } = item;
    //    console.log(location)
    return (
        <div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
                <img className="w-full h-48 object-cover" src={thumbnail} alt={title || postType} />
                <div className="px-6 py-4">
                    <div className="font-bold text-black text-xl mb-2">{title}</div>
                    <div className="font-semibold text-black text-lg mb-2">{postType} Item</div>
                    <p className="text-gray-700 text-base mb-2">
                        <span className="font-semibold">Category:</span> {category}
                    </p>
                    <p className="text-gray-700 text-base mb-2">
                        <span className="font-semibold">Location:</span> {location}
                    </p>
                    <p className="text-gray-700 text-base mb-2">
                        <span className="font-semibold">Date:</span> {date}
                    </p>
                    {recoveryDate && (
                        <p className="text-green-700 text-base mb-2">
                            <span className="font-semibold">Recovery Date:</span> {recoveryDate}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Recover_Single_Item;


// {
//     "_id": "684f4a9396910e5b273a2b47",
//     "itemId": "684efa8afa521b060d004edb",
//     "": "2025-04-10T00:00:00.000Z",
//     "userEmail": "smzim15@gmail.com",
//     "location": "Central Park, New York, NY",
//     "date": "2025-06-15",
//     "postType": "Lost"
// }