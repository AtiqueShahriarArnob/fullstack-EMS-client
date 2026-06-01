import { useEffect, useState } from "react";
import EmployeeDashboard from "../Components/EmployeeDashboard";
import AdminDashboard from "../Components/AdminDashboard";
import api from "../api/axios";
import toast from "react-hot-toast";

const Dashboard = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/dashboard").then((res) => setData(res.data)).catch((err) =>
            toast.error(err.response?.data?.error || err?.message)).finally(() => setLoading(false))
    }, []);

    if (loading) return <p>loading..</p>;

    if (!data) return <p>Failed to load data</p>;

    if (data.role === "ADMIN") {
        return <AdminDashboard data={data}></AdminDashboard>
    } else {
        return <EmployeeDashboard data={data}></EmployeeDashboard>
    }
};

export default Dashboard;