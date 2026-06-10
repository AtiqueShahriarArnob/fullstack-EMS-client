import React, { useEffect, useState, useCallback } from "react";
import { Loader2, Shield, User } from "lucide-react";
import ChangePasswordModal from "../Components/ChangePasswordModal";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../api/axios";

const Settings = () => {
    const { user } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true);

            const res = await api.get("/profile");

            const data =
                res.data?.profile ||
                res.data?.user ||
                res.data;

            setProfile(data);
        } catch (err) {
            toast.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user) fetchProfile();
        else setLoading(false);
    }, [user, fetchProfile]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <Loader2 className="w-6 h-6 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">

            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold">Settings</h1>
                <p className="text-sm text-gray-500">
                    Manage your account & security
                </p>
            </div>

            {/* ACCOUNT SECTION */}
            <div className="bg-white border rounded-xl p-6 space-y-4">

                <div className="flex items-center gap-2 font-semibold text-lg">
                    <User className="w-5 h-5" />
                    Account Information
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                    <div>
                        <p className="text-gray-500">Name</p>
                        <p className="font-medium">
                            {profile.firstName} {profile.lastName}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">Email</p>
                        <p className="font-medium">{profile.email}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Role</p>
                        <p className="font-medium">{user.role}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-medium">{profile.employmentStatus}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Department</p>
                        <p className="font-medium">{profile.department}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Position</p>
                        <p className="font-medium">{profile.position}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">User ID</p>
                        <p className="font-medium text-xs">{profile.userId}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Join Date</p>
                        <p className="font-medium">
                            {new Date(profile.joinDate).toDateString()}
                        </p>
                    </div>

                </div>
            </div>

            {/* SECURITY SECTION */}
            <div className="bg-white border rounded-xl p-6 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <div>
                        <p className="font-medium">Security</p>
                        <p className="text-sm text-gray-500">
                            Change your password anytime
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => setShowPasswordModal(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                    Change Password
                </button>

            </div>

            {/* MODAL */}
            <ChangePasswordModal
                open={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />
        </div>
    );
};

export default Settings;