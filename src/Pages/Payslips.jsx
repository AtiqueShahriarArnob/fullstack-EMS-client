import React, { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import PayslipList from "../components/payslip/PayslipList";
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

const Payslips = () => {
    const [payslips, setPayslips] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";

    const fetchPayslips = useCallback(async () => {
        try {
            setLoading(true);

            const res = await api.get("/payslips");

            setPayslips(
                Array.isArray(res?.data?.data)
                    ? res.data.data
                    : []
            );
        } catch (error) {
            toast.error(
                error?.response?.data?.error ||
                error?.message ||
                "Failed to fetch payslips"
            );
            setPayslips([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchEmployees = useCallback(async () => {
        if (!isAdmin) return;

        try {
            const res = await api.get("/employees");

            let employeeData = [];

            if (Array.isArray(res.data)) {
                employeeData = res.data;
            } else if (Array.isArray(res?.data?.data)) {
                employeeData = res.data.data;
            }

            setEmployees(
                employeeData.filter(
                    (employee) => !employee?.isDeleted
                )
            );
        } catch (error) {
            console.error("Employee fetch error:", error);
            setEmployees([]);
        }
    }, [isAdmin]);

    useEffect(() => {
        fetchPayslips();
    }, [fetchPayslips]);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="page-header">
                    <h1 className="page-title">
                        Payslips
                    </h1>

                    <p className="page-subtitle">
                        {isAdmin
                            ? "Generate and manage employee payslips"
                            : "Your payslip history"}
                    </p>
                </div>

                {isAdmin && (
                    <GeneratePayslipForm
                        employees={employees || []}
                        onSuccess={fetchPayslips}
                    />
                )}
            </div>

            <PayslipList
                payslips={Array.isArray(payslips) ? payslips : []}
                isAdmin={isAdmin}
            />
        </div>
    );
};

export default Payslips;