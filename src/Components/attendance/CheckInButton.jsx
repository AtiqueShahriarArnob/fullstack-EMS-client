import { Loader2Icon, LogInIcon, LogOutIcon } from 'lucide-react';
import React, { useState } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const CheckInButton = ({ todayRecord, onAction }) => {
    const [loading, setLoading] = useState(false);

    const isCheckedIn = !!todayRecord?.checkIn;

    const handleAttendance = async () => {
        setLoading(true);
        try {
            // FIX: If your backend needs to know if this is an "in" or "out" action,
            // pass it in the body like this: { action: isCheckedIn ? 'checkout' : 'checkin' }
            await api.post("/attendance", {
                action: isCheckedIn ? "checkout" : "checkin"
            });

            onAction();
            toast.success(isCheckedIn ? "Clocked out successfully!" : "Clocked in successfully!");
        } catch (error) {
            toast.error(error?.response?.data?.error || error?.message || "Something went wrong");
        } finally {
            // Using finally guarantees loading turns false even if the API throws an error
            setLoading(false);
        }
    };

    if (todayRecord?.checkOut) {
        return (
            <div className='flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-200'>
                <h3 className='text-lg font-bold text-slate-900'>Work Day Complete</h3>
                <p className='text-slate-500 text-sm mt-1'>Great job! see you tomorrow</p>
            </div>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* FIX: Changed 'disable' to 'disabled' */}
            <button
                className={`w-full max-w-xs flex justify-between items-center gap-8 p-4 rounded-xl bg-linear-to-br text-white transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""
                    } ${isCheckedIn ? "from-slate-700 to-slate-900" : "from-indigo-600 to-indigo-700"
                    }`}
                onClick={handleAttendance}
                disabled={loading}
            >
                {loading ? (
                    <Loader2Icon className='size-7 animate-spin' />
                ) : isCheckedIn ? (
                    <LogOutIcon className='size-7' />
                ) : (
                    <LogInIcon className='size-7' />
                )}

                <div className='relative flex flex-col items-center text-center'>
                    <h2 className='mb-1 text-lg font-medium'>
                        {loading ? "processing..." : isCheckedIn ? "Clock Out" : "Clock In"}
                    </h2>
                    <p className='text-xs opacity-80'>
                        {isCheckedIn ? "Click to end your Shift" : "start your work day"}
                    </p>
                </div>
            </button>
        </div>
    );
};

export default CheckInButton;