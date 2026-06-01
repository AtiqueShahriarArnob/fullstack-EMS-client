import React, { useState } from 'react';
import { Plus, X, Loader2 } from 'lucide-react';

const GeneratePayslipForm = ({ employees, onSuccess }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="btn-primary flex items-center gap-2"
            >
                <Plus className="w-4 h-4" />
                <span>Generate Payslip</span>
            </button>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="card max-w-lg w-full p-6 animate-slide-up">
                <div className="flex justify-between items-center mb-6">
                    <h3>Generate monthly PaySlip</h3>

                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="text-slate-400 hover:text-slate-600 p-1"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Select Employee */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Employee
                        </label>
                        <select
                            name="employee"
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        >
                            <option value="">Select Employee</option>

                            {Array.isArray(employees) &&
                                employees.map((employee) => (
                                    <option
                                        key={employee._id}
                                        value={employee._id}
                                    >
                                        {employee.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Month */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Month
                        </label>
                        <select
                            name="month"
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        >
                            <option value="">Select Month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    </div>

                    {/* Year */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Year
                        </label>
                        <input
                            type="number"
                            name="year"
                            defaultValue={new Date().getFullYear()}
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        />
                    </div>

                    {/* Basic Salary */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Basic Salary
                        </label>
                        <input
                            type="number"
                            name="basicSalary"
                            placeholder="Enter Basic Salary"
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        />
                    </div>

                    {/* Allowances */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Allowances
                        </label>
                        <input
                            type="number"
                            name="allowances"
                            placeholder="Enter Allowances"
                            className="w-full border rounded-lg px-3 py-2"
                            defaultValue={0}
                        />
                    </div>

                    {/* Deductions */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Deductions
                        </label>
                        <input
                            type="number"
                            name="deductions"
                            placeholder="Enter Deductions"
                            className="w-full border rounded-lg px-3 py-2"
                            defaultValue={0}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 border rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex items-center gap-2"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            Generate Payslip
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default GeneratePayslipForm;