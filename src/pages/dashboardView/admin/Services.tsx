import {
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
import CWSTable from "../../../components/ui/CWSTable";
import {
    useCreateServiceMutation,
    useDeleteServiceMutation,
    useFetchAllServicesQuery,
    useUpdateServiceMutation,
} from "../../../redux/features/services/services.api";
import { TService } from "../../../types";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import CWSForm from "../../../components/forms/CWSForm";
import CWSInput from "../../../components/forms/CWSInput";
import { CgSpinnerTwo } from "react-icons/cg";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CWSTextarea from "../../../components/forms/CWSTextarea";
import CWSUpload from "../../../components/forms/CWSUpload";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoAlertFill } from "react-icons/go";

type TFormattedService = {
    id: string;
    name: string;
    duration: number;
    price: number;
};

const tableHeaders = ["Name", "Duration", "Price", "Action"];

const Services = () => {
    const [createService, { isLoading: isCreatingService }] = useCreateServiceMutation();
    const [updateService, { isLoading: isUpdatingService }] = useUpdateServiceMutation();
    const [deleteService, { isLoading: isDeletingService }] = useDeleteServiceMutation();
    const [imageUploading, setImageUploading] = useState(false);
    const [service, setService] = useState<TService | null>(null);
    const [serviceAction, setServiceAction] = useState<"create" | "update">("create");
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);
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

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const successMessage =
            serviceAction === "create"
                ? "Service created successfully."
                : "Service updated successfully.";
        const errorMessage =
            serviceAction === "create" ? "Service creation failed." : "Service failed to update.";
        const serviceData: Partial<TService> = {
            ...data,
            duration: Number(data?.duration),
            price: Number(data?.price),
        };
        if (data?.image) {
            if (typeof data?.image === "string") {
                serviceData.image = data?.image;
            } else if (typeof data?.image === "object") {
                console.log(data.image);
                const imageData = new FormData();
                imageData.append("image", data?.image);
                try {
                    setImageUploading(true);
                    const res = await fetch(
                        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
                        {
                            method: "POST",
                            body: imageData,
                        }
                    );
                    const result = await res.json();
                    if (result?.data) {
                        setImageUploading(false);

                        serviceData.image = result?.data?.display_url;
                    }
                } catch (error) {
                    console.log(error);
                    setImageUploading(false);
                    toast.error("Service creation failed.");
                }
            }
        }
        const action =
            serviceAction === "create"
                ? createService(serviceData).unwrap()
                : updateService({ id: service?._id, data: serviceData }).unwrap();
        try {
            const res = await action;
            if (!res?.success) {
                toast.error(errorMessage);
            }
            if (res.error) {
                toast.error(errorMessage);
            }
            if (res.data) {
                toast.success(successMessage);
            }
        } catch (error) {
            console.log(error);
            toast.error(errorMessage);
        } finally {
            setIsVisible(false);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await deleteService(service?._id).unwrap();
            if (!res?.success) {
                toast.error("Service deletion failed.");
            }
            if (res.error) {
                toast.error("Service deletion failed.");
            }
            if (res.data) {
                toast.success("Service deleted successfully.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Service deletion failed.");
        } finally {
            setIsVisibleDeleteModal(false);
        }
    };

    const serviceSchema = z.object({
        name: z.string({ required_error: "Name is required" }),
        description: z.string({ required_error: "Description is required" }),
        price: z.any({ required_error: "Price is required" }),
        duration: z.any({ required_error: "Duration is required" }),
        image: z.any().optional(),
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-4 flex-wrap">
                <h3 className="text-slate-900 text-2xl font-bold">All Services</h3>
                <Button
                    onClick={() => {
                        setIsVisible(true);
                        setService(null);
                        setServiceAction("create");
                    }}
                    className="bg-cws-yellow hover:bg-cws-yellow/90 active:bg-cws-yellow"
                >
                    Create Service
                </Button>
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
                                    onClick={() => {
                                        const service = services?.data?.find(
                                            (serviceItem: TService) => item?.id === serviceItem?._id
                                        );
                                        setIsVisible(true);
                                        setService(service);
                                        setServiceAction("update");
                                    }}
                                    className="bg-green-500 hover:bg-green-500/80 active:bg-green-500"
                                    shape="icon"
                                >
                                    <FaEdit className="text-lg" />
                                </Button>
                                <Button
                                    onClick={() => {
                                        const service = services?.data?.find(
                                            (serviceItem: TService) => item?.id === serviceItem?._id
                                        );
                                        setIsVisibleDeleteModal(true);
                                        setService(service);
                                    }}
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

            <Modal isOpen={isVisible} onOpenChange={setIsVisible}>
                <ModalContent className="w-96">
                    <ModalClose className="absolute right-4 top-4" />
                    <ModalHeader>
                        <div className="space-y-1">
                            <ModalTitle className="mb-5">
                                {serviceAction == "create"
                                    ? "Service information."
                                    : "Update Service."}
                            </ModalTitle>
                            <ModalDescription>
                                <CWSForm
                                    onSubmit={handleSubmit}
                                    resolver={zodResolver(serviceSchema)}
                                    defaultValues={service ?? {}}
                                >
                                    <div className="space-y-3">
                                        <CWSInput
                                            type="text"
                                            name="name"
                                            placeholder="Service name"
                                        />
                                        <CWSTextarea
                                            name="description"
                                            placeholder="Service short description"
                                        />
                                        <CWSInput type="number" name="price" placeholder="$50" />
                                        <CWSInput
                                            type="number"
                                            name="duration"
                                            placeholder="50 Min"
                                        />
                                        <CWSUpload name="image" />

                                        <Button
                                            type="submit"
                                            className={`bg-cws-yellow hover:bg-cws-yellow/90 w-full ${
                                                isCreatingService || imageUploading
                                                    ? "bg-cws-yellow/65 hover:bg-cws-yellow/65"
                                                    : "bg-cws-yellow"
                                            }`}
                                        >
                                            {isCreatingService ||
                                            imageUploading ||
                                            isUpdatingService ? (
                                                <CgSpinnerTwo className="animate-spin text-white text-2xl" />
                                            ) : serviceAction == "create" ? (
                                                "Create"
                                            ) : (
                                                "Update"
                                            )}
                                        </Button>
                                    </div>
                                </CWSForm>
                            </ModalDescription>
                        </div>
                    </ModalHeader>
                </ModalContent>
            </Modal>
            <Modal onOpenChange={setIsVisibleDeleteModal} isOpen={isVisibleDeleteModal}>
                <ModalContent>
                    <ModalHeader className="space-y-3">
                        <div className="space-y-1 flex flex-col items-center">
                            <div className="w-20 h-20 bg-red-50 text-red-500 flex items-center justify-center text-4xl rounded-md">
                                <GoAlertFill />
                            </div>
                            <h4 className="text-xl font-semibold">Are Your Sure to Delete?</h4>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Button
                                onClick={() => setIsVisibleDeleteModal(false)}
                                className="bg-slate-200 text-slate-600 hover:bg-slate-200/80 active:bg-slate-200"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-400 active:bg-red-500"
                            >
                                {isDeletingService ? (
                                    <CgSpinnerTwo className="animate-spin text-white text-2xl" />
                                ) : (
                                    'Delete'
                                )}
                            </Button>
                        </div>
                    </ModalHeader>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Services;
