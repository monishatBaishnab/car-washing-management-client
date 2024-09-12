import { useNavigate, useParams } from "react-router-dom";
import { useFetchSingleServicesQuery } from "../../redux/features/services/services.api";
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalClose,
    ModalContent,
    ModalHeader,
} from "keep-react";
import { CaretRight } from "phosphor-react";
import { TDateSlot, TService } from "../../types";
import { GiDuration } from "react-icons/gi";
import { TbCoinTakaFilled } from "react-icons/tb";
import Select, { SingleValue } from "react-select";
import { useState } from "react";
import { dateValidator } from "../../utils/dateValidator";
import CWSInput from "../../components/forms/CWSInput";
import CWSForm from "../../components/forms/CWSForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema } from "../../schemas";
import { useAppDispatch } from "../../redux/hooks";
import { setBookingData } from "../../redux/features/bookings/bookings.slice";
import { FaCircleCheck, FaRegCircleCheck } from "react-icons/fa6";
import LoadingServiceDetails from "../../components/module/serviceDetails/LoadingServiceDetails";
import EmptySlot from "../../components/module/serviceDetails/emptySlot";

type TSelectedDate = { label: string; value: string };

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const todayDate = `${year}-${month}-${day}`;
const formattedDate = {
    label: todayDate,
    value: todayDate,
};

const ServicesDetails = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState<SingleValue<TSelectedDate>>(formattedDate);
    const [selectedSlot, setSelectedSlot] = useState<{ slotId: string; slot: string } | null>(null);
    const { serviceId } = useParams();
    const { data: service, isLoading: isServiceLoading } = useFetchSingleServicesQuery(
        serviceId as string
    );
    const dispatch = useAppDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const serviceData: TService = service?.data?.service ?? {};
    const slotsData: TDateSlot[] = service?.data?.slots ?? [];
    const dateOptions = slotsData?.map((slot) => ({
        value: slot.date,
        label: slot.date,
        isDisabled: !dateValidator(slot.date),
    }));
    const selectedSlotData = slotsData?.find((slot) => selectedDate?.value === slot.date);

    const onChange = (value: SingleValue<TSelectedDate>) => {
        setSelectedDate(value);
    };

    const handleSelectSlot = (id: string, slot: string) => {
        setSelectedSlot({ slotId: id, slot });
    };

    const handleBooking: SubmitHandler<FieldValues> = async (data) => {
        const bookingData = {
            vehicleType: data.vehicleType,
            vehicleBrand: data.vehicleBrand,
            vehicleModel: data.vehicleModel,
            manufacturingYear: data.manufacturingYear,
            registrationPlate: data.registrationPlate,
            serviceId: serviceId as string,
            slotId: selectedSlot?.slotId,
        };

        dispatch(
            setBookingData({
                bookingData,
                serviceData: { ...serviceData, slot: selectedSlot?.slot },
            })
        );
        navigate("/bookings");
        setModalOpen(false);
    };

    return (
        <>
            <section className="bg-slate-100">
                <div className="container flex flex-col items-center">
                    <h2 className="text-4xl font-bold">Service Details</h2>
                    <Breadcrumb>
                        <BreadcrumbItem onClick={() => navigate("/")}>Home</BreadcrumbItem>
                        <BreadcrumbItem onClick={() => navigate("/services")}>
                            <CaretRight size={18} color="#455468" />
                            Services
                        </BreadcrumbItem>
                        <BreadcrumbItem className="cursor-auto hover:text-black">
                            <CaretRight size={18} color="#455468" />
                            {serviceData?.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </section>
            {isServiceLoading ? (
                <LoadingServiceDetails />
            ) : (
                <section>
                    <div className="container grid gap-7 grid-cols-1 md:grid-cols-2">
                        <div>
                            <div className="bg-slate-50 border border-slate-200 p-5 w-full h-60 sm:h-96 overflow-hidden">
                                <img
                                    className="h-full w-full object-cover"
                                    src={serviceData?.image}
                                    alt={serviceData?.name}
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="border-b border-slate-200 pb-3 space-y-1">
                                <h3 className="text-3xl font-semibold">{serviceData?.name}</h3>
                                <div className="flex items-center gap-1 text-sm font-medium">
                                    <GiDuration className="mt-[1.5px] text-lg" />
                                    <span>{serviceData?.duration} Min</span>
                                </div>
                            </div>
                            <div className="pb-3 border-b border-b-slate-200 space-y-2">
                                <div className="flex items-center gap-1 text-sm font-medium">
                                    <TbCoinTakaFilled className="mt-[1.5px] text-lg text-slate-500" />
                                    <h4 className="text-2xl text-cws-yellow font-bold">
                                        {serviceData?.price}
                                    </h4>
                                </div>
                                <p className="text-slate-600">{serviceData.description}</p>
                            </div>
                            <div>
                                <h5 className="text-lg font-semibold text-slate-800">
                                    Available Slots
                                </h5>
                                <div>
                                    <div className="">
                                        <label className="font-medium mt-4 mb-2 text-slate-600 block">
                                            Select Date
                                        </label>
                                        <Select
                                            defaultValue={selectedDate}
                                            options={dateOptions}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {!isServiceLoading && selectedSlotData?.slots?.length ? (
                                            selectedSlotData?.slots?.map((item) => (
                                                <button
                                                    key={item._id}
                                                    disabled={
                                                        !dateValidator(
                                                            selectedDate?.value as string
                                                        ) ||
                                                        item.isBooked === "booked" ||
                                                        item.isBooked === "canceled"
                                                    }
                                                    onClick={() =>
                                                        handleSelectSlot(
                                                            item._id,
                                                            `${item.startTime} - ${item.endTime}`
                                                        )
                                                    }
                                                    className={[
                                                        "flex items-center justify-center gap-2 px-4 py-1 rounded border transition-all border-blue-100 text-blue-800 bg-blue-50 cursor-pointer",
                                                        "hover:border-blue-300/70",
                                                        "active:bg-slate-200/60",
                                                        "disabled:bg-gray-100 disabled:text-gray-600 disabled:opacity-70 disabled:cursor-default disabled:border-gray-200 disabled:hover:border-gray-200",
                                                        `${
                                                            item._id === selectedSlot?.slotId
                                                                ? "!bg-blue-700 !text-white"
                                                                : ""
                                                        }`,
                                                    ].join(" ")}
                                                >
                                                    {item._id === selectedSlot?.slotId ? (
                                                        <FaCircleCheck />
                                                    ) : (
                                                        <FaRegCircleCheck />
                                                    )}
                                                    <span>
                                                        {item.startTime} - {item.endTime}
                                                    </span>
                                                </button>
                                            ))
                                        ) : (
                                            <EmptySlot />
                                        )}
                                    </div>
                                    {slotsData?.length < 1 ? (
                                        <p className="text-slate-600 mt-3">No Slot Available</p>
                                    ) : (
                                        <p className="text-slate-600 mt-3">
                                            <span className="font-medium">Note : </span> Please
                                            select a slot for booking service.
                                        </p>
                                    )}

                                    <div className="mt-5">
                                        <Button
                                            disabled={!selectedSlot}
                                            onClick={() => setModalOpen(true)}
                                            size="md"
                                            className="bg-cws-yellow hover:bg-cws-yellow/80 active:bg-cws-yellow disabled:bg-cws-yellow/80"
                                        >
                                            Book this service
                                        </Button>
                                        <Modal isOpen={modalOpen} onOpenChange={setModalOpen}>
                                            <ModalContent>
                                                <ModalClose className="absolute right-4 top-4" />
                                                <ModalHeader className="space-y-3">
                                                    <div>
                                                        <h4 className="text-slate-700 font-medium text-lg">
                                                            Vehicle Information
                                                        </h4>
                                                    </div>
                                                    <CWSForm
                                                        defaultValues={{
                                                            vehicleType: "truck",
                                                            vehicleBrand: "Ford",
                                                            vehicleModel: "Explorer",
                                                            manufacturingYear: 2021,
                                                            registrationPlate: "XYZ456",
                                                        }}
                                                        resolver={zodResolver(vehicleSchema)}
                                                        onSubmit={handleBooking}
                                                    >
                                                        <div className="space-y-3 mb-5">
                                                            <CWSInput
                                                                name="vehicleType"
                                                                type="text"
                                                                placeholder="Vehicle Type"
                                                            />
                                                            <CWSInput
                                                                name="vehicleBrand"
                                                                type="text"
                                                                placeholder="Vehicle Brand"
                                                            />
                                                            <CWSInput
                                                                name="vehicleModel"
                                                                type="text"
                                                                placeholder="Vehicle Model"
                                                            />
                                                            <CWSInput
                                                                name="manufacturingYear"
                                                                type="text"
                                                                placeholder="Vehicle Manufacturing Year "
                                                            />
                                                            <CWSInput
                                                                name="registrationPlate"
                                                                type="text"
                                                                placeholder="Registration Plate Number"
                                                            />
                                                        </div>
                                                        <Button
                                                            type="submit"
                                                            className={`bg-cws-yellow hover:bg-cws-yellow/90 w-full`}
                                                        >
                                                            Continue Booking
                                                        </Button>
                                                    </CWSForm>
                                                </ModalHeader>
                                            </ModalContent>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default ServicesDetails;
