import { useNavigate, useParams } from "react-router-dom";
import { useFetchSingleServicesQuery } from "../../redux/features/services/services.api";
import { Breadcrumb, BreadcrumbItem, Button } from "keep-react";
import { CaretRight } from "phosphor-react";
import { TDateSlot, TService } from "../../types";
import { GiDuration } from "react-icons/gi";
import { TbCoinTakaFilled } from "react-icons/tb";
import Select, { SingleValue } from "react-select";
import { useState } from "react";
import { dateValidator } from "../../utils/dateValidator";

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
    const [selectedSlot, setSelectedSlot] = useState("");
    const { serviceId } = useParams();
    const { data: service } = useFetchSingleServicesQuery(serviceId as string);
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

    const handleSelectSlot = (id: string) => {
        setSelectedSlot(id);
    };

    const handleBooking = () => {
        console.log("booking");
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
                                    {selectedSlotData?.slots?.map((item) => (
                                        <button
                                            key={item._id}
                                            disabled={
                                                !dateValidator(selectedDate?.value as string) ||
                                                item.isBooked === "booked"
                                            }
                                            onClick={() => handleSelectSlot(item._id)}
                                            className={`px-3 py-1 bg-blue-100 rounded-md text-cws-primary-dark border border-blue-300 transition-all active:bg-blue-300/80 hover:bg-blue-300 disabled:bg-slate-200 disabled:border-slate-300 ${
                                                item._id === selectedSlot ? "bg-blue-400" : ""
                                            }`}
                                        >
                                            {item.startTime} - {item.endTime}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-5">
                                    <Button
                                        onClick={handleBooking}
                                        size="md"
                                        className="bg-cws-yellow hover:bg-cws-yellow/80 active:bg-cws-yellow"
                                    >
                                        Book this service
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServicesDetails;
