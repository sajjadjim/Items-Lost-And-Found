  export   const myPostedItemsPriomise = (email) => {
        {
            return fetch(`http://localhost:3000/itemsAll?email=${email}`)
                .then(res => res.json())
                .catch(error => console.error('Error fetching items:', error));
        }
    }

// , {
//     credentials:'include'
// }

