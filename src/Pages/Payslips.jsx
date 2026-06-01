import React, { useCallback, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
    dummyPayslipData,
    dummyEmployeeDashboardData,
} from '../assets/assets';
import PayslipList from '../components/payslip/PayslipList';
import GeneratePayslipForm from '../components/payslip/GeneratePayslipForm';
const Payslips = () => {
    const [payslips, setPayslip] = useState([]);
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);

    const isAdmin = true;

    const fetchPayslips = useCallback(async () => {
        setPayslip(dummyPayslipData);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        fetchPayslips();
    }, [fetchPayslips]);

    useEffect(() => {
        if (isAdmin) {
            setEmployees(dummyEmployeeDashboardData);
        }
    }, [isAdmin]);

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
                    <GeneratePayslipForm employees={employees} onSuccess={fetchPayslips}></GeneratePayslipForm>
                )}
            </div>

            <PayslipList
                payslips={payslips}
                isAdmin={isAdmin}
            />
        </div>
    );
};

export default Payslips;