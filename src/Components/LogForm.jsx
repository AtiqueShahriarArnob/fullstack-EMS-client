import LoginLeftSide from './LoginLeftSide';
import {
    ArrowLeftIcon,
    EyeIcon,
    EyeOffIcon
} from 'lucide-react';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const LogForm = ({ title, role }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password, role);
            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error.response?.data?.error ||
                error.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>

            <LoginLeftSide />

            <div className='flex-1 flex items-center justify-center p-6 sm:p-12 bg-white'>

                <div className='w-full max-w-md'>

                    <Link
                        to='/login'
                        className='inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm mb-10'
                    >
                        <ArrowLeftIcon size={16} />
                        Back to Portal
                    </Link>

                    <div className='mb-8'>
                        <h1 className='text-2xl sm:text-3xl font-medium text-zinc-800'>
                            {title}
                        </h1>
                    </div>

                    {
                        error && (
                            <div className='mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start gap-3'>
                                <div className='w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0'></div>
                                {error}
                            </div>
                        )
                    }

                    <form
                        className='space-y-5'
                        onSubmit={handleSubmit}
                    >

                        {/* Email */}
                        <div>
                            <label className='block text-sm font-medium text-slate-700 mb-2'>
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder='abc@gmail.com'
                                className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className='block text-sm font-medium text-slate-700 mb-2'>
                                Password
                            </label>

                            <div className='relative'>

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder='••••••••'
                                    className='w-full border border-slate-300 rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-indigo-500'
                                />

                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700'
                                >
                                    {
                                        showPassword ? (
                                            <EyeOffIcon size={20} />
                                        ) : (
                                            <EyeIcon size={20} />
                                        )
                                    }
                                </button>

                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300 disabled:opacity-70'
                        >
                            {
                                loading ? "Logging in..." : "Login"
                            }
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default LogForm;