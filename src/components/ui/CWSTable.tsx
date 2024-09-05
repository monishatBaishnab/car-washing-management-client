import { Table, TableBody, TableHead, TableHeader, TableRow } from "keep-react";
import { ReactNode } from "react";

const CWSTable = ({ headers, children }: { headers: string[]; children: ReactNode }) => {
    return (
        <Table className="rounded-none">
            <TableHeader>
                <TableRow>
                    {headers?.map((header) => (
                        <TableHead key={header}>{header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>{children}</TableBody>
        </Table>
    );
};

export default CWSTable;
