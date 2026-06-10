import React, { useState } from 'react';
import { Plus, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

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
        setLoading(true)
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries())
        try {
            await api.post('/payslips', data)
            setIsOpen(false)
            onSuccess()
        } catch (err) {
            toast.error(err.response?.data?.error || err?.message);
        }
        setLoading(false)
    }
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
                            name="employeeId"
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
                                        {employee.firstName} {employee.lastName}
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
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
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