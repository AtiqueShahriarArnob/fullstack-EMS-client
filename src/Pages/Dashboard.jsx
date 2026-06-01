import { useEffect, useState } from "react";
import { dummyAdminDashboardData, dummyEmployeeDashboardData } from "../assets/assets";
import EmployeeDashboard from "../Components/EmployeeDashboard";
import AdminDashboard from "../Components/AdminDashboard";

const Dashboard = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setData(dummyAdminDashboardData);

        setTimeout(() => {
            setLoading(false);
        }, 1000);

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