  export   const myPostedItemsPromise = (email , accessToken) => {
        {
            return fetch(`http://localhost:3000/itemsAll?email=${email}`,
                {
                    headers : {
                    authorization : `Bearer ${accessToken}`
                    }
                }
            )
                .then(res => res.json())
                .catch(error => console.error('Error fetching items:', error));
        }
    }

// , {
//     credentials:'include'
// }

