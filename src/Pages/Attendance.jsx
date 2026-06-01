import { useCallback, useEffect, useState } from "react";
import { dummyAttendanceData } from "../assets/assets";
import { Loader2 } from "lucide-react";
import CheckInButton from "../Components/attendance/CheckInButton";
import AttendanceStats from "../Components/attendance/AttendanceStats";
import AttendanceHistory from "../Components/attendance/AttendanceHistory";

const Attendance = () => {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);

    const fetchData = useCallback(async () => {
        setHistory(dummyAttendanceData);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) return <Loader2 />;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRecord = history.find(
        (r) =>
            new Date(r.date).toDateString() === today.toDateString()
    );

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1 className="page-Title">
                    Attendance
                </h1>
                <p className="page-subtitle">
                    Track your work Hours
                </p>
            </div>
            {isDeleted ? (
                <div className="mb-8 pb-6 bg-rose-50 border border-rose-200 rounded-2xl text-center">
                    <p className="text-rose-600">
                        You can NO longer clock in or out because your employee records have been marked as deleted
                    </p>
                </div>

            ) : (
                <div className="mb-8">
                    <CheckInButton todayRecord={todayRecord} onAction={fetchData}></CheckInButton>
                </div>
            )}
            <AttendanceStats history={history}></AttendanceStats>
            <AttendanceHistory history={history} ></AttendanceHistory>
        </div>
    );
};

export default Attendance;