import React, { useState } from "react";
import { Loader2, Lock, X } from "lucide-react";
import api from "../api/axios";

const ChangePasswordModal = ({ open, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        text: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage({ type: "", text: "" });

        const formData = new FormData(e.currentTarget);

        const currentPassword = formData.get("currentPassword");
        const newPassword = formData.get("newPassword");

        try {
            const { data } = await api.post("/auth/change-password", {
                currentPassword,
                newPassword,
            });

            if (!data.success) {
                throw new Error(data.error || "Failed to update password");
            }

            setMessage({
                type: "success",
                text: "Password updated successfully",
            });

            e.target.reset();

            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            console.error("Change Password Error:", error);

            setMessage({
                type: "error",
                text:
                    error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    error.message ||
                    "Failed to update password",
            });
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                        <Lock className="w-5 h-5 text-slate-500" />
                        Change Password
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 transition"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {message.text && (
                        <div
                            className={`p-3 rounded-lg text-sm ${message.type === "success"
                                    ? "bg-green-50 text-green-700 border border-green-200"
                                    : "bg-red-50 text-red-700 border border-red-200"
                                }`}
                        >
                            {message.text}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Current Password
                        </label>

                        <input
                            type="password"
                            name="currentPassword"
                            required
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter current password"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            New Password
                        </label>

                        <input
                            type="password"
                            name="newPassword"
                            required
                            minLength={6}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter new password"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="btn-secondary flex-1"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex-1 flex items-center justify-center gap-2"
                        >
                            {loading && (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            )}
                            {loading
                                ? "Updating..."
                                : "Update Password"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;