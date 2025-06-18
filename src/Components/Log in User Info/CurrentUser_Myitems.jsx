import React, { Suspense, use } from 'react';
import { AuthContext_File } from '../../Authcontext/AuthProvider';
import MyItems from './MyItems';
import { myPostedItemsPromise } from '../../Api Loading Data/MyItemsAll'

const CurrentUser_Myitems = () => {

    const { user } = use(AuthContext_File)
    // console.log("My access token" , user.accessToken)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '60vh', justifyContent: 'center' }}>
            <h1 style={{ textAlign: 'center', margin: '30px 0', fontSize: '2rem', color: '#3b82f6', fontWeight: 'bold', letterSpacing: '1px' }}>
                My All Items Are Here Found And Lost
            </h1>
            <div style={{ width: '83.3333%' /* 10/12 */ }}>
                <Suspense
                    fallback={
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
                            <div className="spinner" style={{
                                border: '6px solid #f3f3f3',
                                borderTop: '6px solid #3b82f6',
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px',
                                animation: 'spin 1s linear infinite'
                            }} />
                            <style>
                                {`
                                    @keyframes spin {
                                        0% { transform: rotate(0deg); }
                                        100% { transform: rotate(360deg); }
                                    }
                                `}
                            </style>
                            <div style={{ marginTop: '16px', color: '#3b82f6', fontWeight: '500' }}>Loading...</div>
                        </div>
                    }
                >
                    <MyItems myPostedItemsPriomise={myPostedItemsPromise(user.email , user.accessToken)} />
                </Suspense>
            </div>
        </div>
    );
};

export default CurrentUser_Myitems;