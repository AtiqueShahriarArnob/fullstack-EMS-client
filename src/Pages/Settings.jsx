import React, { useEffect, useState, useCallback } from "react";
import { Loader2, Lock } from "lucide-react";
import ProfileForm from "../Components/ProfileForm";
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

            // Handle different backend response formats
            const profileData =
                res.data?.profile ||
                res.data?.user ||
                res.data;

            setProfile(profileData);
        } catch (err) {
            console.error(err);

            toast.error(
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Failed to load profile"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [user, fetchProfile]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <Loader2 className="w-8 h-8 animate-spin text-slate-500" />
            </div>
        );
    }

    return (
        <div className="animate-fade-in space-y-6">
            {/* Header */}
            <div className="page-header">
                <h1 className="page-title">Settings</h1>
                <p className="page-subtitle">
                    Manage your account settings
                </p>
            </div>

            {/* Profile Form */}
            {profile ? (
                <ProfileForm
                    initialData={profile}
                    onSuccess={fetchProfile}
                />
            ) : (
                <div className="card p-6 text-center text-slate-500">
                    Profile not found
                </div>
            )}

            {/* Password Section */}
            <div className="card max-w-md p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-100 rounded-lg">
                        <Lock className="w-5 h-5 text-slate-500" />
                    </div>

                    <div>
                        <p className="font-medium text-slate-900">
                            Password
                        </p>

                        <p className="text-sm text-slate-500">
                            Update your account password
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setShowPasswordModal(true)}
                    className="btn-secondary text-sm"
                >
                    Change
                </button>
            </div>

            {/* Password Modal */}
            <ChangePasswordModal
                open={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />
        </div>
    );
};

export default Settings;