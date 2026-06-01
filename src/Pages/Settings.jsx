import React, { useEffect, useState } from 'react';
import { dummyProfileData } from '../assets/assets';
import { Loader2, Lock } from 'lucide-react';
import ProfileForm from '../Components/ProfileForm';
import ChangePasswordModal from '../Components/ChangePasswordModal';

const Settings = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const fetchProfile = async () => {
        setProfile(dummyProfileData);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="w-6 h-6 animate-spin" />
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1 className="page-title">Settings</h1>
                <p className="page-subtitle">Manage Your Account</p>
            </div>

            {profile && (
                <ProfileForm
                    initialData={profile}
                    onSuccess={fetchProfile}
                />
            )}

            <div className="card max-w-md p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-100 rounded-lg">
                        <Lock className="w-5 h-5 text-slate-500" />
                    </div>

                    <div>
                        <p>Password</p>
                        <p>Update your account password</p>
                    </div>
                </div>

                <button
                    onClick={() => setShowPasswordModal(true)}
                    className="btn-secondary text-sm"
                >
                    Change
                </button>
            </div>

            <ChangePasswordModal
                open={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />
        </div>
    );
};

export default Settings;