import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "keep-react";
import { ReactNode } from "react";
import empty_image from "../../assets/images/empty-bookings.svg";
import { TFormattedBooking } from "../../types";

type TCWSTableProps = {
    headers: string[];
    children: ReactNode;
    isLoading: boolean;
    data?: TFormattedBooking[];
};

const CWSTable = ({ headers, children, isLoading, data }: TCWSTableProps) => {
    if (data && !data?.length) {
        return (
            <div>
                <div
                    className={`bg-slate-100 w-full flex items-center justify-between py-4 px-5 opacity-70 cursor-default`}
                >
                    {headers?.map((header) => (
                        <h6 key={header} className="text-slate-800 font-medium">
                            {header}
                        </h6>
                    ))}
                </div>
                <div className="flex items-center flex-col p-5">
                    <div className="w-44 h-32 overflow-hidden">
                        <img className="w-full h-full object-contain" src={empty_image} alt="Empty Image" />
                    </div>
                    <h3 className="text-2xl text-slate-500 font-bold">No Data Found</h3>
                </div>
            </div>
        );
    }

    return (
        <Table className="rounded-none">
            <TableHeader>
                <TableRow>
                    {headers?.map((header) => (
                        <TableHead key={header}>{header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {!isLoading
                    ? children
                    : Array.from({ length: 4 })?.map((_, id) => (
                          <TableRow key={id} className="animate-pulse">
                              {Array.from({ length: headers?.length }).map((_, id) => (
                                  <TableCell key={id}>
                                      <div className="w-full bg-slate-100 h-10"> </div>
                                  </TableCell>
                              ))}
                          </TableRow>
                      ))}
            </TableBody>
        </Table>
    );
};

export default CWSTable;
