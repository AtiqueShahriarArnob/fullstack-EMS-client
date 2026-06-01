import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import api from "../api/axios";

const PrintPayslip = () => {
    const { id } = useParams();

    const [payslip, setPayslip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayslip = async () => {
            try {
                const res = await api.get(`/payslips/${id}`);

                // Handle both API formats
                setPayslip(res.data.payslip || res.data);
            } catch (error) {
                console.error("Error fetching payslip:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayslip();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (!payslip) {
        return (
            <p className="text-center py-12 text-slate-400">
                Payslip not found
            </p>
        );
    }

    const basicSalary = Number(payslip.basicSalary || 0);
    const allowances = Number(payslip.allowances || 0);
    const deduction = Number(payslip.deduction || 0);
    const netSalary = Number(
        payslip.netSalary ||
        basicSalary + allowances - deduction
    );

    const period =
        payslip.year && payslip.month
            ? format(
                new Date(
                    Number(payslip.year),
                    Number(payslip.month) - 1,
                    1
                ),
                "MMMM yyyy"
            )
            : "N/A";

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow rounded-lg animate-fade-in">
            <div className="text-center border-b border-slate-200 pb-6 mb-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    PAYSLIP
                </h1>

                <p className="text-slate-500 text-sm mt-1">
                    {period}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                    <p className="text-xs text-slate-400 uppercase mb-1">
                        Employee Name
                    </p>

                    <p className="font-semibold text-slate-900">
                        {payslip.employee?.firstName || "N/A"}{" "}
                        {payslip.employee?.lastName || ""}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-slate-400 uppercase mb-1">
                        Position
                    </p>

                    <p className="font-semibold text-slate-900">
                        {payslip.employee?.position || "N/A"}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-slate-400 uppercase mb-1">
                        Email
                    </p>

                    <p className="font-semibold text-slate-900 break-all">
                        {payslip.employee?.email || "N/A"}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-slate-400 uppercase mb-1">
                        Period
                    </p>

                    <p className="font-semibold text-slate-900">
                        {period}
                    </p>
                </div>
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden mb-8">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50">
                            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">
                                Description
                            </th>
                            <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase">
                                Amount
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-t border-slate-100">
                            <td className="py-3 px-4">
                                Basic Salary
                            </td>
                            <td className="py-3 px-4 text-right font-medium">
                                ${basicSalary.toLocaleString()}
                            </td>
                        </tr>

                        <tr className="border-t border-slate-100">
                            <td className="py-3 px-4">
                                Allowances
                            </td>
                            <td className="py-3 px-4 text-right font-medium">
                                +${allowances.toLocaleString()}
                            </td>
                        </tr>

                        <tr className="border-t border-slate-100">
                            <td className="py-3 px-4">
                                Deduction
                            </td>
                            <td className="py-3 px-4 text-right font-medium">
                                -${deduction.toLocaleString()}
                            </td>
                        </tr>

                        <tr className="border-t-2 border-slate-200 bg-slate-50">
                            <td className="py-3 px-4 font-bold">
                                Net Salary
                            </td>
                            <td className="py-3 px-4 text-right font-bold text-lg">
                                ${netSalary.toLocaleString()}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="text-center">
                <button
                    className="btn-primary print:hidden"
                    onClick={() => window.print()}
                >
                    Print Payslip
                </button>
            </div>
        </div>
    );
};

export default PrintPayslip;