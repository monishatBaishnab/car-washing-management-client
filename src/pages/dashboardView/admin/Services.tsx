import { Button, TableCell, TableRow } from "keep-react";
import CWSTable from "../../../components/ui/CWSTable";
import { useFetchAllServicesQuery } from "../../../redux/features/services/services.api";
import { TService } from "../../../types";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
type TFormattedService = {
    id: string;
    name: string;
    duration: string;
    price: string;
};

const tableHeaders = ["Name", "Duration", "Price", "Action"];

const Services = () => {
    const { data: services, isError, isLoading } = useFetchAllServicesQuery(undefined);
    let tableData: TFormattedService[] = [];

    if (!isLoading && !isError) {
        tableData = services?.data?.map((service: TService) => ({
            id: service?._id,
            name: service?.name,
            duration: service?.duration,
            price: service?.price,
        }));
    }
    return (
        <div>
            <div className="flex items-center justify-between mb-4 flex-wrap">
                <h3 className="text-slate-900 text-2xl font-bold">All Bookings</h3>
                <Button className="bg-cws-yellow hover:bg-cws-yellow/90 active:bg-cws-yellow">Create Service</Button>
            </div>

            <CWSTable data={tableData} isLoading={isLoading} headers={tableHeaders}>
                {tableData.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.duration}</TableCell>
                        <TableCell>{item.price}</TableCell>
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

export default Services;
