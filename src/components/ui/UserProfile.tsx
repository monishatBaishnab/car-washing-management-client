import { Button } from "keep-react";
import { FaEdit } from "react-icons/fa";
import { TUserResponse } from "../../types";

const UserProfile = ({
    userInfo,
    setModalVisible,
    isLoading,
}: {
    userInfo: TUserResponse;
    setModalVisible: (value: boolean) => void;
    isLoading: boolean;
}) => {
    if (isLoading) {
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
                    onClick={() => setModalVisible(true)}
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
                <h2 className="text-3xl text-slate-900 font-semibold mb-4">{userInfo?.name}</h2>
                <div className="space-x-3 flex">
                    <div className="inline-flex flex-col gap-y-2">
                        <span className="inline-block text-slate-700 font-medium">Role</span>
                        <span className="inline-block text-slate-700 font-medium">Email</span>
                        <span className="inline-block text-slate-700 font-medium">Status</span>
                    </div>
                    <div className="inline-flex flex-col gap-y-2">
                        <span className="inline-block text-slate-700 font-medium text-nowrap">
                            : {userInfo?.role}
                        </span>
                        <span className="inline-block text-slate-700 font-medium text-nowrap">
                            : {userInfo?.email}
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
        </div>
    );
};

export default UserProfile;
