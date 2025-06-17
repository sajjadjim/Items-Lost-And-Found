  export   const myPostedItemsPriomise = (email) => {
        {
            return fetch(`https://b11a11-server-side-sajjadjim.vercel.app/itemsAll?email=${email}`)
                .then(res => res.json())
                .catch(error => console.error('Error fetching items:', error));
        }
    }

// , {
//     credentials:'include'
// }

