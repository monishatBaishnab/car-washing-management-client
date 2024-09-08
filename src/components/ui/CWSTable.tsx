import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "keep-react";
import { ReactNode } from "react";

type TCWSTableProps = {
    headers: string[];
    children: ReactNode;
    isLoading: boolean;
};

const CWSTable = ({ headers, children, isLoading }: TCWSTableProps) => {
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
