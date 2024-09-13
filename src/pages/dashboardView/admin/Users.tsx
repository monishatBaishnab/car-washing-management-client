import { Badge, Button, TableCell, TableRow, toast } from "keep-react";
import CWSTable from "../../../components/ui/CWSTable";
import {
    useCreateAdminMutation,
    useFetchAllUsersQuery,
} from "../../../redux/features/auth/auth.api";
import { TUserResponse } from "../../../types";

type TFormattedService = {
    id: string;
    name: string;
    email: string;
    role: string;
};

const tableHeaders = ["Name", "Email", "Role", "Action"];

const Users = () => {
    const { data: users, isError, isLoading } = useFetchAllUsersQuery(undefined);
    const [createAdmin] = useCreateAdminMutation();
    let tableData: TFormattedService[] = [];
    console.log(users);
    if (!isLoading && !isError) {
        tableData = users?.data?.map((user: TUserResponse) => ({
            id: user?._id,
            name: user?.name,
            email: user?.email,
            role: user?.role,
        }));
    }

    const handleCreateAdmin = async (id: string) => {
        try {
            const res = await createAdmin(id).unwrap();
            if (!res?.success) {
                toast.error("Failed to create admin.");
            }
            if (res.error) {
                toast.error("Failed to create admin.");
            }
            if (res.data) {
                toast.success("Successfully created.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4 flex-wrap">
                <h3 className="text-slate-900 text-2xl font-bold">All Users</h3>
            </div>

            <CWSTable data={tableData} isLoading={isLoading} headers={tableHeaders}>
                {tableData.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>
                            <Badge color="primary">{item.role}</Badge>
                        </TableCell>
                        <TableCell align="right">
                            <Button
                                onClick={() => handleCreateAdmin(item?.id)}
                                size="sm"
                                disabled={String(item?.role) === "admin"}
                                className="bg-green-500 hover:bg-green-500/80 active:bg-green-500 disabled:bg-green-500/70 disabled:opacity-60"
                            >
                                Create Admin
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </CWSTable>
        </div>
    );
};

export default Users;
