import { Badge, Button, TableCell, TableRow } from "keep-react";
import CWSTable from "../../../components/ui/CWSTable";
import UserProfile from "../../../components/ui/UserProfile";
import { useFetchAllBookingsQuery } from "../../../redux/features/bookings/bookings.api";
import { TBooking, TFormattedBooking } from "../../../types";
import Countdown from "react-countdown";
import { formatDate } from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";

const tableHeaders = ["Service", "Payment Status", "Date", "Remaining Time"];

const AdminDashboard = () => {
    const navigate = useNavigate();
    const {
        data: recentBookings,
        isLoading: rcbLoading,
        isError: rcbError,
    } = useFetchAllBookingsQuery([
        {
            name: "limit",
            value: "2",
        },
    ]);

    let tableData: TFormattedBooking[] = [];

    if (!rcbError && !rcbLoading) {
        tableData = recentBookings?.data?.map((booking: TBooking) => ({
            id: booking?._id,
            serviceName: booking?.service?.name,
            date: booking?.slot?.date,
            startTime: booking?.slot?.startTime,
            paymentStatus: booking?.paymentStatus,
        }));
    }

    return (
        <div>
            <UserProfile />
            <div>
                <div className="my-5 flex items-center justify-between">
                    <h3 className="text-slate-900 text-2xl font-bold">Recent Bookings</h3>
                    <Button
                        disabled={!tableData?.length}
                        onClick={() => navigate("/dashboard/admin/bookings")}
                        className="bg-cws-yellow hover:bg-cws-yellow/80 active:bg-cws-yellow disabled:bg-cws-yellow/50 disabled:opacity-50"
                    >
                        See All Bookings
                    </Button>
                </div>
                <CWSTable data={tableData} isLoading={rcbLoading} headers={tableHeaders}>
                    {tableData.map((item) => {
                        const [month, day, year] = item?.date?.split("/") ?? [];
                        // Create a new Date object using the split parts
                        const dateStr = `${year}-${month}-${day}T${item?.startTime}`;

                        return (
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
                                <TableCell>
                                    {formatDate(`${item.date} ${item.startTime}`)}
                                </TableCell>
                                <TableCell align="right">
                                    <Countdown date={new Date(dateStr)} />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </CWSTable>
            </div>
        </div>
    );
};

export default AdminDashboard;
