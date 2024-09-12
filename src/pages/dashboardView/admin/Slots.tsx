import {
    Badge,
    Button,
    Modal,
    ModalClose,
    ModalContent,
    ModalDescription,
    ModalHeader,
    ModalTitle,
    TableCell,
    TableRow,
    toast,
} from "keep-react";
import {
    useCreateSlotMutation,
    useFetchAllSlotsQuery,
    useUpdateSlotMutation,
} from "../../../redux/features/slots/slots.api";
import { TService, TSlot } from "../../../types";
import CWSTable from "../../../components/ui/CWSTable";
import CWSInput from "../../../components/forms/CWSInput";
import CWSForm from "../../../components/forms/CWSForm";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { CgSpinnerTwo } from "react-icons/cg";
import { useFetchAllServicesQuery } from "../../../redux/features/services/services.api";
import CWSSelect from "../../../components/forms/CWSSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import createSlotSchema from "../../../schemas/slot.schema";

type TFormattedSlot = {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    availability: string;
};

const tableHeaders = ["Date", "Start Time", "End Time", "Availability", "Action"];

const Slots = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [createSlot, { isLoading: isCreatingSlot }] = useCreateSlotMutation();
    const [updateSlot] = useUpdateSlotMutation();
    const { data: slots, isError, isLoading } = useFetchAllSlotsQuery(undefined);
    const {
        data: services,
        isError: serviceError,
        isLoading: serviceLoading,
    } = useFetchAllServicesQuery(undefined);
    const serviceData: { value: string; label: string }[] = [];

    if (!serviceError && !serviceLoading) {
        services?.data?.forEach((service: TService) => {
            serviceData.push({
                label: service?.name,
                value: service?._id as string,
            });
        });
    }

    let tableData: TFormattedSlot[] = [];

    if (!isLoading && !isError) {
        tableData = slots?.data?.map((slot: TSlot) => ({
            id: slot?._id,
            date: slot?.date,
            startTime: slot?.startTime,
            endTime: slot?.endTime,
            availability: slot?.isBooked,
        }));
    }

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const slotData = {
            service: data?.service,
            date: data?.date,
            startTime: data?.startTime,
            endTime: data?.endTime,
        };

        try {
            const res = await createSlot(slotData).unwrap();
            console.log(res);
            if (!res?.success) {
                toast.error("Slot creation failed.");
            }
            if (res.error) {
                toast.error("Slot creation failed.");
            }
            if (res.data) {
                toast.success("Successfully slot created.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Slot creation failed.");
        } finally {
            setIsVisible(false);
        }
    };

    const handleStatusUpdate = async (status: "available" | "canceled", slotId: string) => {
        try {
            const res = await updateSlot({ id: slotId, isBooked: status }).unwrap();
            console.log(res);
            if (!res?.success) {
                toast.error("Slot update failed.");
            }
            if (res.error) {
                toast.error("Slot update failed.");
            }
            if (res.data) {
                toast.success("Successfully slot updated.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Slot update failed.");
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4 flex-wrap">
                <h3 className="text-slate-900 text-2xl font-bold">All Slots</h3>
                <Button
                    onClick={() => setIsVisible(true)}
                    className="bg-cws-yellow hover:bg-cws-yellow/90 active:bg-cws-yellow"
                >
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
                            <div className="flex flex-col items-end gap-1">
                                <Button
                                    disabled={
                                        item.availability === "booked" ||
                                        item.availability === "available"
                                    }
                                    size="xs"
                                    onClick={() => handleStatusUpdate("available", item?.id)}
                                    className="w-16 bg-green-500 hover:bg-green-400 active:bg-green-500 disabled:bg-green-500 disabled:hover:bg-green-500 disabled:opacity-30"
                                >
                                    Available
                                </Button>
                                <Button
                                    disabled={
                                        item.availability === "booked" ||
                                        item.availability === "canceled"
                                    }
                                    size="xs"
                                    onClick={() => handleStatusUpdate("canceled", item?.id)}
                                    className="w-16 justify-center bg-red-500 hover:bg-red-400 active:bg-red-500 disabled:bg-red-500 disabled:hover:bg-red-500 disabled:opacity-30"
                                >
                                    Canceled
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </CWSTable>

            <Modal isOpen={isVisible} onOpenChange={setIsVisible}>
                <ModalContent className="w-96">
                    <ModalClose className="absolute right-4 top-4" />
                    <ModalHeader>
                        <div className="space-y-1">
                            <ModalTitle className="mb-5">Slot information.</ModalTitle>
                            <ModalDescription>
                                <CWSForm
                                    resolver={zodResolver(createSlotSchema)}
                                    onSubmit={handleSubmit}
                                >
                                    <div className="space-y-3 relative">
                                        <CWSSelect
                                            label="Service"
                                            name="service"
                                            options={serviceData}
                                        />
                                        <CWSInput
                                            label="Date"
                                            type="text"
                                            name="date"
                                            placeholder="dd/mm/yy"
                                        />
                                        <CWSInput
                                            label="Start Time"
                                            type="text"
                                            name="startTime"
                                            placeholder="(12:00)"
                                        />
                                        <CWSInput
                                            label="End Time"
                                            type="text"
                                            name="endTime"
                                            placeholder="(14:00)"
                                        />
                                        <Button
                                            type="submit"
                                            className={`bg-cws-yellow hover:bg-cws-yellow/90 w-full ${
                                                isCreatingSlot
                                                    ? "bg-cws-yellow/65 hover:bg-cws-yellow/65"
                                                    : "bg-cws-yellow"
                                            }`}
                                        >
                                            {isCreatingSlot ? (
                                                <CgSpinnerTwo className="animate-spin text-white text-2xl" />
                                            ) : (
                                                "Create"
                                            )}
                                        </Button>
                                    </div>
                                </CWSForm>
                            </ModalDescription>
                        </div>
                    </ModalHeader>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Slots;
