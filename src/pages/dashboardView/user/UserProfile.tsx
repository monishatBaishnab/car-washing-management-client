import Countdown from "react-countdown";
import { RxDot } from "react-icons/rx";

type TCounter = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
};

const UserProfile = () => {
    const renderer = ({ days, hours, minutes, seconds, completed }: TCounter) => {
        if (completed) {
            return;
        } else {
            const formatNumber = (num: number) => String(num).padStart(2, "0");
            return (
                <div className="flex items-center justify-center flex-col  space-y-5 !mt-0 !pt-0">
                    <h2 className="text-3xl text-cws-yellow uppercase font-bold">
                        Next Service Starts Soon ...
                    </h2>
                    <div className="flex items-center gap-3">
                        <div className="text-center">
                            <h6 className="text-lg text-gray-500 uppercase">Days</h6>
                            <h2 className="text-3xl sm:text-5xl text-gray-700">
                                {formatNumber(days)}
                            </h2>
                        </div>
                        <div className="flex items-center justify-center flex-col h-full w-full">
                            <RxDot className="text-lg text-gray-700" />
                            <RxDot className="text-lg text-gray-700" />
                        </div>
                        <div className="text-center">
                            <h6 className="text-lg text-gray-500 uppercase">Hours</h6>
                            <h2 className="text-3xl sm:text-5xl text-gray-700">
                                {formatNumber(hours)}
                            </h2>
                        </div>
                        <div className="flex items-center justify-center flex-col h-full w-full">
                            <RxDot className="text-lg text-gray-700" />
                            <RxDot className="text-lg text-gray-700" />
                        </div>
                        <div className="text-center">
                            <h6 className="text-lg text-gray-500 uppercase">Minutes</h6>
                            <h2 className="text-3xl sm:text-5xl text-gray-700">
                                {formatNumber(minutes)}
                            </h2>
                        </div>
                        <div className="flex items-center justify-center flex-col h-full w-full">
                            <RxDot className="text-lg text-gray-700" />
                            <RxDot className="text-lg text-gray-700" />
                        </div>
                        <div className="text-center">
                            <h6 className="text-lg text-gray-500 uppercase">Seconds</h6>
                            <h2 className="text-3xl sm:text-5xl text-gray-700">
                                {formatNumber(seconds)}
                            </h2>
                        </div>
                    </div>
                </div>
            );
        }
    };
    return (
        <div className="space-y-6 grid grid-cols-1 xl:grid-cols-2">
            <div className="bg-cws-yellow/70 p-6 rounded flex items-center gap-8">
                <div className="h-40 w-40 overflow-hidden bg-slate-100 rounded-full pt-5">
                    <img
                        className="w-full h-full object-contain"
                        src="/user_profile.png"
                        alt="User Profile"
                    />
                </div>
                <div>
                    <h2 className="text-3xl text-slate-900 font-semibold mb-4">
                        Monishat Baishnab
                    </h2>
                    <div className="space-x-3">
                        <div className="inline-flex flex-col gap-y-2">
                            <span className="inline-block text-slate-700 font-medium">Role</span>
                            <span className="inline-block text-slate-700 font-medium">Email</span>
                            <span className="inline-block text-slate-700 font-medium">Status</span>
                        </div>
                        <div className="inline-flex flex-col gap-y-2">
                            <span className="inline-block text-slate-700 font-medium">: Admin</span>
                            <span className="inline-block text-slate-700 font-medium">
                                : monishat@gmail.com
                            </span>
                            <span className="inline-block text-slate-700 font-medium">
                                :{" "}
                                <span className="bg-green-500 px-2 rounded pb-1 text-white">
                                    Active
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Countdown date={new Date("2024-10-05T11:24:00").getTime()} renderer={renderer} />
        </div>
    );
};

export default UserProfile;
