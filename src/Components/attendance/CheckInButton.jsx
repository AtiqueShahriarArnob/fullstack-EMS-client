import React, { useState } from "react";
import { Loader2Icon, LogInIcon, LogOutIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axios";

const CheckInButton = ({ todayRecord, onAction }) => {
    const [loading, setLoading] = useState(false);

    const isCheckedIn = Boolean(todayRecord?.checkIn);

    const handleAttendance = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const { data } = await api.post("/attendance");

            if (onAction) {
                onAction();
            }

            if (data?.type === "CHECK_IN") {
                toast.success("Clocked in successfully!");
            } else if (data?.type === "CHECK_OUT") {
                toast.success("Clocked out successfully!");
            } else {
                toast.success("Attendance updated successfully!");
            }
        } catch (error) {
            console.error("Attendance error:", error);

            toast.error(
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    if (todayRecord?.checkOut) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-2xl">
                <h3 className="text-lg font-bold text-slate-900">
                    Work Day Complete
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Great job! See you tomorrow.
                </p>
            </div>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={handleAttendance}
                disabled={loading}
                className={`flex items-center justify-between gap-6 p-4 rounded-xl text-white shadow-lg transition-all
                ${loading
                        ? "opacity-70 cursor-not-allowed"
                        : isCheckedIn
                            ? "bg-slate-800 hover:bg-slate-900"
                            : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
            >
                {loading ? (
                    <Loader2Icon className="w-6 h-6 animate-spin" />
                ) : isCheckedIn ? (
                    <LogOutIcon className="w-6 h-6" />
                ) : (
                    <LogInIcon className="w-6 h-6" />
                )}

                <div className="flex flex-col flex-1 text-center">
                    <h2 className="text-lg font-medium">
                        {loading
                            ? "Processing..."
                            : isCheckedIn
                                ? "Clock Out"
                                : "Clock In"}
                    </h2>

                    <p className="text-xs opacity-80">
                        {isCheckedIn
                            ? "Click to end your shift"
                            : "Start your work day"}
                    </p>
                </div>
            </button>
        </div>
    );
};

export default CheckInButton;