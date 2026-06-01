import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";

import { DEPARTMENTS } from "../assets/assets";
import api from "../api/axios";

const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const isEditMode = Boolean(initialData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        if (isEditMode) {
            const password = formData.get("password");

            if (!password) {
                formData.delete("password");
            }
        }

        try {
            const url = isEditMode
                ? `/employees/${initialData.id}`
                : "/employees";

            const method = isEditMode ? "put" : "post";

            await api[method](url, formData);

            toast.success(
                isEditMode
                    ? "Employee updated successfully"
                    : "Employee created successfully"
            );

            if (onSuccess) {
                onSuccess();
            } else {
                navigate("/employee");
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-3xl animate-fade-in"
        >
            {/* Personal Information */}
            <div className="card p-5 sm:p-6">
                <h3 className="font-medium mb-6 pb-4 border-b border-slate-100">
                    Personal Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                    <div>
                        <label className="block mb-2">First Name</label>
                        <input
                            className="input-field"
                            name="firstName"
                            required
                            defaultValue={initialData?.firstName}
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Last Name</label>
                        <input
                            className="input-field"
                            name="lastName"
                            required
                            defaultValue={initialData?.lastName}
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Phone Number</label>
                        <input
                            className="input-field"
                            name="phone"
                            required
                            defaultValue={initialData?.phone}
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Join Date</label>
                        <input
                            className="input-field"
                            type="date"
                            name="joinDate"
                            required
                            defaultValue={
                                initialData?.joinDate
                                    ? new Date(initialData.joinDate)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                            }
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block mb-2">
                            Bio (Optional)
                        </label>

                        <textarea
                            className="input-field resize-none"
                            name="bio"
                            rows={3}
                            defaultValue={initialData?.bio}
                            placeholder="Brief description..."
                        />
                    </div>
                </div>
            </div>

            {/* Employment Details */}
            <div className="card p-5 sm:p-6">
                <h3 className="font-medium mb-6 pb-4 border-b border-slate-100">
                    Employment Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                    <div>
                        <label className="block mb-2">Department</label>

                        <select
                            className="input-field"
                            name="department"
                            defaultValue={initialData?.department || ""}
                            required
                        >
                            <option value="">
                                Select Department
                            </option>

                            {DEPARTMENTS.map((dept) => (
                                <option
                                    key={dept}
                                    value={dept}
                                >
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2">Position</label>

                        <input
                            className="input-field"
                            name="position"
                            required
                            defaultValue={initialData?.position}
                        />
                    </div>

                    <div>
                        <label className="block mb-2">
                            Basic Salary
                        </label>

                        <input
                            className="input-field"
                            type="number"
                            name="basicSalary"
                            min="0"
                            step="0.01"
                            required
                            defaultValue={
                                initialData?.basicSalary || 0
                            }
                        />
                    </div>

                    <div>
                        <label className="block mb-2">
                            Allowances
                        </label>

                        <input
                            className="input-field"
                            type="number"
                            name="allowances"
                            min="0"
                            step="0.01"
                            required
                            defaultValue={
                                initialData?.allowances || 0
                            }
                        />
                    </div>

                    <div>
                        <label className="block mb-2">
                            Deductions
                        </label>

                        <input
                            className="input-field"
                            type="number"
                            name="deductions"
                            min="0"
                            step="0.01"
                            required
                            defaultValue={
                                initialData?.deductions || 0
                            }
                        />
                    </div>

                    {isEditMode && (
                        <div>
                            <label className="block mb-2">
                                Status
                            </label>

                            <select
                                className="input-field"
                                name="employmentStatus"
                                defaultValue={
                                    initialData?.employmentStatus
                                }
                            >
                                <option value="ACTIVE">
                                    Active
                                </option>
                                <option value="INACTIVE">
                                    Inactive
                                </option>
                            </select>
                        </div>
                    )}
                </div>
            </div>

            {/* Account Setup */}
            <div className="card p-5 sm:p-6">
                <h3 className="font-medium mb-6 pb-4 border-b border-slate-100">
                    Account Setup
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                    <div className="sm:col-span-2">
                        <label className="block mb-2">
                            Work Email
                        </label>

                        <input
                            className="input-field"
                            type="email"
                            name="email"
                            required
                            defaultValue={initialData?.email}
                        />
                    </div>

                    {!isEditMode ? (
                        <div>
                            <label className="block mb-2">
                                Temporary Password
                            </label>

                            <input
                                className="input-field"
                                type="password"
                                name="password"
                                required
                            />
                        </div>
                    ) : (
                        <div>
                            <label className="block mb-2">
                                Change Password (Optional)
                            </label>

                            <input
                                className="input-field"
                                type="password"
                                name="password"
                                placeholder="Leave blank to keep current password"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block mb-2">
                            System Role
                        </label>

                        <select
                            className="input-field"
                            name="role"
                            defaultValue={
                                initialData?.user?.role ||
                                "EMPLOYEE"
                            }
                        >
                            <option value="EMPLOYEE">
                                Employee
                            </option>
                            <option value="ADMIN">
                                Admin
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={() =>
                        onCancel
                            ? onCancel()
                            : navigate(-1)
                    }
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex items-center justify-center"
                >
                    {loading && (
                        <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                    )}

                    {isEditMode
                        ? "Update Employee"
                        : "Create Employee"}
                </button>
            </div>
        </form>
    );
};

export default EmployeeForm;