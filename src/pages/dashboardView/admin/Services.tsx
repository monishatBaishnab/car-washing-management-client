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
    useFetchAllServicesQuery,
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

const defaultValues = {
    name: "Tire and Wheel Detailing",
    description: "Specialized cleaning and detailing of tires and wheels",
    price: 50,
    duration: 45,
};

type TFormattedService = {
    id: string;
    name: string;
    duration: string;
    price: string;
};

const tableHeaders = ["Name", "Duration", "Price", "Action"];

const Services = () => {
    const [createService, { isLoading: isCreatingService }] = useCreateServiceMutation();
    const [imageUploading, setImageUploading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
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
        const serviceData: Partial<TService> = {
            ...data,
            duration: Number(data?.duration),
            price: Number(data?.price),
        };
        if (data?.image) {
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

        try {
            const res = await createService(serviceData).unwrap();
            if (!res?.success) {
                toast.error("Service creation failed.");
            }
            if (res.error) {
                toast.error("Service creation failed.");
            }
            if (res.data) {
                toast.success("Successfully service created.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Service creation failed");
        } finally {
            setIsVisible(false);
        }
    };

    const serviceSchema = z.object({
        name: z.string({ required_error: "Name is required" }),
        description: z.string({ required_error: "Description is required" }),
        price: z.number({ required_error: "Price is required" }),
        duration: z.number({ required_error: "Duration is required" }),
        image: z
            .instanceof(File, { message: "Image must be a valid file" })
            .refine((file) => file.type === "image/jpeg" || file.type === "image/png", {
                message: "Image must be a JPG or PNG file",
            }),
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-4 flex-wrap">
                <h3 className="text-slate-900 text-2xl font-bold">All Bookings</h3>
                <Button
                    onClick={() => setIsVisible(true)}
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

            <Modal isOpen={isVisible} onOpenChange={setIsVisible}>
                <ModalContent className="w-96">
                    <ModalClose className="absolute right-4 top-4" />
                    <ModalHeader>
                        <div className="space-y-1">
                            <ModalTitle className="mb-5">Service information.</ModalTitle>
                            <ModalDescription>
                                <CWSForm
                                    onSubmit={handleSubmit}
                                    resolver={zodResolver(serviceSchema)}
                                    defaultValues={defaultValues}
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
                                            {isCreatingService || imageUploading ? (
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

export default Services;
