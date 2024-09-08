import { Button, toast } from "keep-react";
import { FaEdit } from "react-icons/fa";
import {
    useFetchUserInfoQuery,
    useUpdateProfileMutation,
} from "../../redux/features/auth/auth.api";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";
import UserProfileUpdate from "./UserProfileUpdate";

const UserProfile = () => {
    const [updateProfile, { isLoading: isPULoading }] = useUpdateProfileMutation();
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const user = useAppSelector((state) => state.auth.user);
    const { data: userInfo, isLoading: isUserLoading } = useFetchUserInfoQuery(user?.email);

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = await updateProfile({ id: userInfo?.data?._id, data }).unwrap();
            if (!res?.success) {
                toast.error("Failed to update profile");
            }
            if (res.error) {
                toast.error("Failed to update profile.");
            }
            if (res.data) {
                toast.success("Profile updated successfully.");
                setIsUpdateModalVisible(false);
            }
        } catch (error) {
            toast.error("Failed to update profile.");
            console.log(error);
        }
    };

    if (isUserLoading) {
        return (
            <div className="bg-cws-yellow/70 animate-pulse w-full h-[210px] rounded p-6 flex items-center gap-5">
                <div className="w-40 h-40 basis-40 shrink-0 bg-cws-yellow/50 rounded-full"></div>
                <div className="space-y-2 w-full">
                    <div className="w-full h-10 bg-cws-yellow/50 rounded"></div>
                    <div className="w-full h-5 bg-cws-yellow/50 rounded"></div>
                    <div className="w-full h-5 bg-cws-yellow/50 rounded"></div>
                    <div className="w-full h-5 bg-cws-yellow/50 rounded"></div>
                    <div className="w-full h-5 bg-cws-yellow/50 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-cws-yellow/70 p-6 rounded flex items-center gap-8 flex-wrap relative group">
            <div className="absolute right-4 top-4 opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible group-hover:top-5 group-hover:right-5">
                <Button
                    onClick={() => setIsUpdateModalVisible(true)}
                    shape="icon"
                    className="bg-white text-slate-800 hover:bg-white"
                >
                    <FaEdit />
                </Button>
            </div>
            <div className="h-40 w-40 overflow-hidden bg-slate-100 rounded-full pt-5">
                <img
                    className="w-full h-full object-contain"
                    src="/user_profile.png"
                    alt="User Profile"
                />
            </div>

            <div>
                <h2 className="text-3xl text-slate-900 font-semibold mb-4">
                    {userInfo?.data?.name}
                </h2>
                <div className="space-x-3 flex">
                    <div className="inline-flex flex-col gap-y-2">
                        <span className="inline-block text-slate-700 font-medium">Role</span>
                        <span className="inline-block text-slate-700 font-medium">Email</span>
                        <span className="inline-block text-slate-700 font-medium">Status</span>
                    </div>
                    <div className="inline-flex flex-col gap-y-2">
                        <span className="inline-block text-slate-700 font-medium text-nowrap">
                            :{" "}
                            {userInfo?.data?.role?.slice(0, 1).toUpperCase() +
                                userInfo?.data?.role?.slice(1)}
                        </span>
                        <span className="inline-block text-slate-700 font-medium text-nowrap">
                            : {userInfo?.data?.email}
                        </span>
                        <span className="inline-block text-slate-700 font-medium text-nowrap">
                            :{" "}
                            <span className="bg-green-500 px-2 rounded pb-1 text-white">
                                Active
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <UserProfileUpdate
                handleSubmit={handleSubmit}
                isLoading={isPULoading}
                isVisible={isUpdateModalVisible}
                setVisible={setIsUpdateModalVisible}
                userInfo={userInfo?.data}
            />
        </div>
    );
};

export default UserProfile;
