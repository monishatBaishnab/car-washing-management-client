import { Badge, TableCell, TableRow } from "keep-react";
import CWSTable from "../../../components/ui/CWSTable";
import { useFetchAllBookingsQuery } from "../../../redux/features/bookings/bookings.api";
import { TBooking, TFormattedBooking } from "../../../types";
import { formatDate } from "../../../utils/formatDate";
import Countdown from "react-countdown";
const tableHeaders = ["Service", "Payment Status", "Date", "Remaining Time"];

const Bookings = () => {
    const {
        data: recentBookings,
        isLoading: rcbLoading,
        isError: rcbError,
    } = useFetchAllBookingsQuery(undefined);

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
            <h3 className="text-slate-900 text-2xl font-bold mb-4">Recent Bookings</h3>

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
                            <TableCell>{formatDate(`${item.date} ${item.startTime}`)}</TableCell>
                            <TableCell align="right">
                                <Countdown date={new Date(dateStr)} />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </CWSTable>
        </div>
    );
};

export default Bookings;
