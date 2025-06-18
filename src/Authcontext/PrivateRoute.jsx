import React, { use } from 'react'
import { Navigate } from 'react-router'
import { AuthContext_File } from './AuthProvider'
import { useLocation } from 'react-router'
function PrivateRoute({ children }) {

    const { user, loading } = use(AuthContext_File)
    //  console.log(loading)
    
    // State Navigate the user thr previous route 
    const location = useLocation()
    //  console.log(location)

    if (loading) {
        return <div>Loading...</div>
    }
    // console.log(user)

    if (user && user.email) {
        return children
    }
    else {
        return <Navigate state={location.pathname} to='/login'>
        </Navigate>
    }
}

export default PrivateRoute