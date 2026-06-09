import React from "react";
import { format } from "date-fns";
import { Download } from "lucide-react";

const PayslipList = ({ payslips = [], isAdmin = false }) => {
    return (
        <div className="card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="table-modern">
                    <thead>
                        <tr>
                            {isAdmin && <th>Employee</th>}
                            <th>Period</th>
                            <th>Basic Salary</th>
                            <th>Net Salary</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {!payslips || payslips.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={isAdmin ? 5 : 4}
                                    className="text-center py-12 text-slate-400"
                                >
                                    No Payslips Found
                                </td>
                            </tr>
                        ) : (
                            payslips.map((payslip) => (
                                <tr key={payslip._id || payslip.id}>
                                    {isAdmin && (
                                        <td>
                                            {payslip.employee?.name || "No Name"}
                                        </td>
                                    )}

                                    <td>
                                        {format(
                                            new Date(
                                                payslip.year,
                                                payslip.month - 1
                                            ),
                                            "MMMM yyyy"
                                        )}
                                    </td>

                                    <td>
                                        $
                                        {Number(
                                            payslip.basicSalary || 0
                                        ).toLocaleString()}
                                    </td>

                                    <td>
                                        $
                                        {Number(
                                            payslip.netSalary || 0
                                        ).toLocaleString()}
                                    </td>

                                    <td className="text-center">
                                        <button
                                            onClick={() =>
                                                window.open(
                                                    `/print/payslip/${payslip._id || payslip.id}`
                                                )
                                            }
                                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-blue-600 bg-blue-50 hover:bg-blue-100"
                                        >
                                            <Download className="w-3 h-3 mr-1.5" />
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayslipList;