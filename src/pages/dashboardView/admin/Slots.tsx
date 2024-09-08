import { Badge, Button, TableCell, TableRow } from "keep-react";
import { useFetchAllSlotsQuery } from "../../../redux/features/slots/slots.api";
import { TSlot } from "../../../types";
import CWSTable from "../../../components/ui/CWSTable";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

type TFormattedSlot = {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    availability: string;
};

const tableHeaders = ["Date", "Start Time", "End Time", "Availability", "Action"];

const Slots = () => {
    const { data: slots, isError, isLoading } = useFetchAllSlotsQuery(undefined);
    let tableData: TFormattedSlot[] = [];
    console.log(slots);
    if (!isLoading && !isError) {
        tableData = slots?.data?.map((slot: TSlot) => ({
            id: slot?._id,
            date: slot?.date,
            startTime: slot?.startTime,
            endTime: slot?.endTime,
            availability: slot?.isBooked,
        }));
    }
    return (
        <div>
            <div className="flex items-center justify-between mb-4 flex-wrap">
                <h3 className="text-slate-900 text-2xl font-bold">All Slots</h3>
                <Button className="bg-cws-yellow hover:bg-cws-yellow/90 active:bg-cws-yellow">
                    Create Slot
                </Button>
            </div>

            <CWSTable data={tableData} isLoading={isLoading} headers={tableHeaders}>
                {tableData.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.startTime}</TableCell>
                        <TableCell>{item.endTime}</TableCell>
                        <TableCell>
                            <Badge
                                variant="border"
                                color={
                                    item.availability === "booked"
                                        ? "error"
                                        : item?.availability === "available"
                                        ? "success"
                                        : "primary"
                                }
                            >
                                {item.availability}
                            </Badge>
                        </TableCell>
                        <TableCell align="right">
                            <div className="space-x-3">
                                <Button
                                    className="bg-green-500 hover:bg-green-500/80 active:bg-green-500"
                                    shape="icon"
                                >
                                    <FaEdit className="text-lg" />
                                </Button>
                                <Button
                                    className="bg-red-500 hover:bg-red-500/80 active:bg-red-500"
                                    shape="icon"
                                >
                                    <FaTrash className="text-lg" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </CWSTable>
        </div>
    );
};

export default Slots;
