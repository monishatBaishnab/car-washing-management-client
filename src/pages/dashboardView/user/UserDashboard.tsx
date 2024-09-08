import Countdown from "react-countdown";
import { useAppSelector } from "../../../redux/hooks";
import {
    useFetchUserInfoQuery,
    useUpdateProfileMutation,
} from "../../../redux/features/auth/auth.api";
import {
    Badge,
    Button,
    TableCell,
    TableRow,
    toast,
} from "keep-react";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CWSTable from "../../../components/ui/CWSTable";
import { useFetchUpcomingBookingsQuery } from "../../../redux/features/bookings/bookings.api";
import { TBooking } from "../../../types";
import { formatDate } from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import UserProfile from "../../../components/ui/UserProfile";
import CountdownTimer from "../../../components/module/userDashboard/CountdownTimer";
import UserProfileUpdate from "../../../components/ui/UserProfileUpdate";

const tableHeaders = ["Service", "Payment Status", "Date", "Remaining Time"];

export type TFormattedBooking = {
    id: string;
    serviceName: string | null;
    date: string | null;
    startTime: string | null;
    paymentStatus: "pending" | "completed" | "failed";
};

const UserDashboard = () => {
    const navigate = useNavigate();
    const [updateProfile, { isLoading: isPULoading }] = useUpdateProfileMutation();
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const user = useAppSelector((state) => state.auth.user);
    const { data: userInfo, isLoading: isUserLoading } = useFetchUserInfoQuery(user?.email);
    const {
        data: upcomingBookings,
        isLoading: isUCBLoading,
        isError: isUCBError,
    } = useFetchUpcomingBookingsQuery(undefined);

    let tableData: TFormattedBooking[] = [];

    if (!isUCBError && !isUCBLoading) {
        tableData = upcomingBookings?.data?.map((booking: TBooking) => ({
            id: booking?._id,
            serviceName: booking?.service?.name,
            date: booking?.slot?.date,
            startTime: booking?.slot?.startTime,
            paymentStatus: booking?.paymentStatus,
        }));
    }

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

    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <UserProfile
                    isLoading={isUserLoading}
                    setModalVisible={setIsUpdateModalVisible}
                    userInfo={userInfo?.data}
                />

                <CountdownTimer isLoading={isUCBLoading} data={tableData} booking={tableData[0]} />
            </div>
            <div className="mt-5">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-slate-900 text-2xl font-bold">Upcoming Bookings</h3>
                    <Button
                        onClick={() => navigate("/dashboard/user/bookings")}
                        className="bg-cws-yellow hover:bg-cws-yellow/80 active:bg-cws-yellow"
                    >
                        See All Bookings
                    </Button>
                </div>
                <CWSTable isLoading={isUCBLoading} headers={tableHeaders}>
                    {tableData.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.serviceName}</TableCell>
                            <TableCell>
                                <Badge
                                    color={
                                        item?.paymentStatus === "completed"
                                            ? "success"
                                            : item?.paymentStatus === "pending"
                                            ? "warning"
                                            : "error"
                                    }
                                >
                                    {item.paymentStatus}
                                </Badge>
                            </TableCell>
                            <TableCell>{formatDate(`${item.date} ${item.startTime}`)}</TableCell>
                            <TableCell>
                                <Countdown date={new Date(`${item?.date}T${item.startTime}`)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </CWSTable>
            </div>

            <UserProfileUpdate
                handleSubmit={handleSubmit}
                isLoading={isPULoading}
                isVisible={isUpdateModalVisible}
                setVisible={setIsUpdateModalVisible}
                userInfo={userInfo?.data}
            />
        </>
    );
};

export default UserDashboard;
