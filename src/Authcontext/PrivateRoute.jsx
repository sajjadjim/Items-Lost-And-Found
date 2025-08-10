import React, { use } from 'react'
import { Navigate } from 'react-router'
import { AuthContext_File } from './AuthProvider'
import { useLocation } from 'react-router'
function PrivateRoute({ children }) {

    const { user, loading } = use(AuthContext_File)

    const location = useLocation()


    if (loading) {
        return <div></div>
    }


    if (user && user.email) {
        return children
    }
    else {
        return <Navigate state={location.pathname} to='/login'>
        </Navigate>
    }
}

export default PrivateRoute