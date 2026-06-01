import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import CheckInButton from "../Components/attendance/CheckInButton";
import AttendanceStats from "../Components/attendance/AttendanceStats";
import AttendanceHistory from "../Components/attendance/AttendanceHistory";
import api from "../api/axios";
import toast from "react-hot-toast";

const Attendance = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);

            const res = await api.get("/attendance");
            const json = res.data;

            setHistory(Array.isArray(json?.data) ? json.data : []);

            if (json?.employee?.isDeleted) {
                setIsDeleted(true);
            } else {
                setIsDeleted(false);
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.error || error?.message
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRecord = history.find(
        (record) =>
            new Date(record.date).toDateString() ===
            today.toDateString()
    );

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1 className="page-title">
                    Attendance
                </h1>

                <p className="page-subtitle">
                    Track your work hours
                </p>
            </div>

            {isDeleted ? (
                <div className="mb-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center">
                    <p className="text-rose-600">
                        You can no longer clock in or out because
                        your employee record has been marked as deleted.
                    </p>
                </div>
            ) : (
                <div className="mb-8">
                    <CheckInButton
                        todayRecord={todayRecord}
                        onAction={fetchData}
                    />
                </div>
            )}

            <AttendanceStats history={history} />

            <AttendanceHistory history={history} />
        </div>
    );
};

export default Attendance;