import Countdown from "react-countdown";
import { Badge, TableCell, TableRow } from "keep-react";
import CWSTable from "../../../components/ui/CWSTable";
import { useFetchMyBookingsQuery } from "../../../redux/features/bookings/bookings.api";
import { TBooking } from "../../../types";
import { formatDate } from "../../../utils/formatDate";

const tableHeaders = ["Service", "Payment Status", "Date", "Remaining Time"];

const UserBookings = () => {
    const {
        data: upcomingBookings,
        isLoading: isUCBLoading,
        isError: isUCBError,
    } = useFetchMyBookingsQuery(undefined);

    let tableData: Record<string, string>[] = [];

    if (!isUCBError && !isUCBLoading) {
        tableData = upcomingBookings?.data?.map((booking: TBooking) => ({
            id: booking?._id,
            serviceName: booking?.service?.name,
            date: booking?.slot?.date,
            startTime: booking?.slot?.startTime,
            paymentStatus: booking?.paymentStatus,
        }));
    }

    return (
        <>
            <h4 className="text-center text-2xl mb-5 font-bold">My Bookings</h4>
            <div>
                <CWSTable headers={tableHeaders}>
                    {tableData?.length > 0 && !isUCBLoading
                        ? tableData.map((item) => (
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
                                  <TableCell>
                                      <Countdown
                                          date={new Date(`${item?.date}T${item.startTime}`)}
                                      />
                                  </TableCell>
                              </TableRow>
                          ))
                        : Array.from({ length: 4 })?.map((_, id) => (
                              <TableRow key={id} className="animate-pulse">
                                  {Array.from({ length: 4 }).map((_, id) => (
                                      <TableCell key={id}>
                                          <div className="w-full bg-slate-100 h-10"> </div>
                                      </TableCell>
                                  ))}
                              </TableRow>
                          ))}
                </CWSTable>
            </div>
        </>
    );
};

export default UserBookings;
