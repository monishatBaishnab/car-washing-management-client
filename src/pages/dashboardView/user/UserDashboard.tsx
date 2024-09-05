import Countdown from "react-countdown";
import { RxDot } from "react-icons/rx";
import { useAppSelector } from "../../../redux/hooks";
import { useFetchUserInfoQuery } from "../../../redux/features/auth/auth.api";
import {
    Button,
    Modal,
    ModalClose,
    ModalContent,
    ModalDescription,
    ModalHeader,
    ModalTitle,
    TableCell,
    TableRow,
} from "keep-react";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import CWSForm from "../../../components/forms/CWSForm";
import CWSInput from "../../../components/forms/CWSInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { CgSpinnerTwo } from "react-icons/cg";
import CWSTable from "../../../components/ui/CWSTable";

const tableData = [
    {
        id: 1,
        fileName: "image1.jpg",
        fileFormat: "JPG",
        ratio: "16:9",
        resolution: "1920x1080",
        fileSize: "1.2MB",
        status: "Processed",
    },
    {
        id: 2,
        fileName: "video1.mp4",
        fileFormat: "MP4",
        ratio: "4:3",
        resolution: "1280x720",
        fileSize: "24MB",
        status: "Uploaded",
    },
    {
        id: 3,
        fileName: "document1.pdf",
        fileFormat: "PDF",
        ratio: "A4",
        resolution: "210x297mm",
        fileSize: "500KB",
        status: "Pending",
    },
    {
        id: 4,
        fileName: "image2.png",
        fileFormat: "PNG",
        ratio: "1:1",
        resolution: "800x800",
        fileSize: "900KB",
        status: "Failed",
    },
    {
        id: 5,
        fileName: "presentation.pptx",
        fileFormat: "PPTX",
        ratio: "16:10",
        resolution: "1440x900",
        fileSize: "5MB",
        status: "Processed",
    },
];
const tableHeaders = [
    "File Name",
    "File Format",
    "Aspect Ratio",
    "Resolution",
    "File Size",
    "Status",
];

type TCounter = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
};

const UserDashboard = () => {
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const user = useAppSelector((state) => state.auth.user);
    const { data: userInfo, isLoading } = useFetchUserInfoQuery(user?.email);
    console.log(userInfo);
    const renderer = ({ days, hours, minutes, seconds, completed }: TCounter) => {
        if (completed) {
            return;
        } else {
            const formatNumber = (num: number) => String(num).padStart(2, "0");
            return (
                <div className="flex items-center justify-center flex-col  space-y-5 !mt-0 !pt-0">
                    <h2 className="text-xl sm:text-3xl text-cws-yellow uppercase font-bold">
                        Next Service Starts Soon...
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
                        <div className="items-center justify-center flex-col h-full w-full hidden md:flex">
                            <RxDot className="text-lg text-gray-700" />
                            <RxDot className="text-lg text-gray-700" />
                        </div>
                        <div className="text-center hidden md:block">
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

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
    };

    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
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
                                <span className="inline-block text-slate-700 font-medium">
                                    Role
                                </span>
                                <span className="inline-block text-slate-700 font-medium">
                                    Email
                                </span>
                                <span className="inline-block text-slate-700 font-medium">
                                    Status
                                </span>
                            </div>
                            <div className="inline-flex flex-col gap-y-2">
                                <span className="inline-block text-slate-700 font-medium text-nowrap">
                                    : {userInfo?.data?.role}
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
                </div>
                <Countdown date={new Date("2024-10-05T11:24:00").getTime()} renderer={renderer} />
            </div>
            <div className="mt-5">
                <h3 className="text-slate-900 text-2xl font-semibold mb-4">My Bookings</h3>
                <CWSTable headers={tableHeaders}>
                    {tableData.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <div className="max-w-[250px] truncate">{item.fileName}</div>
                            </TableCell>
                            <TableCell>{item.fileFormat}</TableCell>
                            <TableCell>{item.ratio}</TableCell>
                            <TableCell>{item.resolution}</TableCell>
                            <TableCell>{item.fileSize}</TableCell>
                            <TableCell>{item.status}</TableCell>
                        </TableRow>
                    ))}
                </CWSTable>
            </div>

            <Modal isOpen={isUpdateModalVisible} onOpenChange={setIsUpdateModalVisible}>
                <ModalContent className="w-96">
                    <ModalClose className="absolute right-4 top-4" />
                    <ModalHeader>
                        <div className="space-y-1">
                            <ModalTitle className="mb-5">Update Profile</ModalTitle>
                            <ModalDescription>
                                <CWSForm
                                    defaultValues={{
                                        name: "Tech Guru",
                                        email: "support@gg-guru.com",
                                        phone: "0987654321",
                                        address: "456 Elm Street, Town, Country",
                                    }}
                                    onSubmit={handleSubmit}
                                >
                                    <div className="space-y-3">
                                        <CWSInput
                                            type="text"
                                            name="name"
                                            placeholder="Write your full name"
                                        />
                                        <CWSInput
                                            type="email"
                                            name="email"
                                            placeholder="Write your user name/email"
                                        />
                                        <CWSInput
                                            type="text"
                                            name="phone"
                                            placeholder="Write your mobile no"
                                        />
                                        <CWSInput
                                            type="text"
                                            name="address"
                                            placeholder="Write your address"
                                        />

                                        <Button
                                            type="submit"
                                            className={`bg-cws-yellow hover:bg-cws-yellow/90 w-full ${
                                                isLoading
                                                    ? "bg-cws-yellow/65 hover:bg-cws-yellow/65"
                                                    : "bg-cws-yellow"
                                            }`}
                                        >
                                            {isLoading ? (
                                                <CgSpinnerTwo className="animate-spin text-white text-2xl" />
                                            ) : (
                                                "Update"
                                            )}
                                        </Button>
                                    </div>
                                </CWSForm>
                            </ModalDescription>
                        </div>
                    </ModalHeader>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UserDashboard;
