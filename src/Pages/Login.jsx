import React from 'react';
import LoginLeftSide from '../Components/LoginLeftSide';
import { Loader, ShieldIcon, UserIcon } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { user, loading } = useAuth()
    if (loading) return <Loader></Loader>
    if (user) return <Navigate to="/"></Navigate>

    const PortalOption = [
        {
            to: '/login/admin',
            title: 'Admin Portal',
            description: "Manage employees, departments, payroll and system configuration",
            icon: ShieldIcon
        },
        {
            to: '/login/employee',
            title: 'Employee Portal',
            description: "Manage your profile, tasks and updates",
            icon: UserIcon
        }
    ];

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <LoginLeftSide />

            <div className='w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen'>

                <div className='w-full max-w-md animated-fade-in relative z-10'>

                    <div className='mb-10 text-center md:text-left'>
                        <h2 className='text-3xl font-medium text-slate-900 tracking-tight mb-3'>
                            Welcome Back
                        </h2>
                        <p className='text-slate-500'>
                            Select your portal to securely access the system.
                        </p>
                    </div>

                    <div className='space-y-4'>
                        {PortalOption.map((portal) => (
                            <Link
                                key={portal.to}
                                to={portal.to}
                                className='group block bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50'
                            >
                                <div className="flex items-center gap-3">
                                    <portal.icon className="w-6 h-6 text-indigo-600" />
                                    <h3 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600">
                                        {portal.title}
                                    </h3>
                                </div>

                                <p className="text-sm text-slate-500 mt-2">
                                    {portal.description}
                                </p>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;