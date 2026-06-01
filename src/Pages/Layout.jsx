import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import { useAuth } from '../context/AuthContext';
import { Loader } from 'lucide-react';

const Layout = () => {
    const { user, loading } = useAuth()
    if (loading) return <Loader></Loader>
    if (!user) return <Navigate to="/login"></Navigate>
    return (
        <div className='flex h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30'>
            <SideBar></SideBar>
            <main className='flex-1 overflow-y-auto'>
                <div className='p-4 pt-16 sm:p-16 sm:pt-6 lg:p-8 max-w-400 mx-auto ' >
                    <Outlet></Outlet>
                </div>
            </main>

        </div>
    );
};

export default Layout;