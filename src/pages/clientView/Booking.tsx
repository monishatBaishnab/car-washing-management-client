import { Breadcrumb, BreadcrumbItem, Button, toast } from "keep-react";
import { CaretRight } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { TbCoinTakaFilled } from "react-icons/tb";
import { GiDuration } from "react-icons/gi";
import { FaCircleCheck } from "react-icons/fa6";
import CWSForm from "../../components/forms/CWSForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CWSInput from "../../components/forms/CWSInput";
import { useCreateBookingMutation } from "../../redux/features/bookings/bookings.api";
import { CgSpinnerTwo } from "react-icons/cg";
import { TBooking } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInfoSchema } from "../../schemas";

const Booking = () => {
    const navigate = useNavigate();
    const [createBooking, { isLoading }] = useCreateBookingMutation();
    const { bookingData, serviceData } = useAppSelector((state) => state.bookings);

    const handleBooking: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        try {
            const res = await createBooking(bookingData as TBooking).unwrap();
            if (!res?.success) {
                toast.error("Failed to booking this service.");
            }
            if (res.error) {
                toast.error(res?.error?.message);
            }
            if (res.data) {
                toast.success("Successfully booked this service.");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Failed to booking this service");
        }
    };
    return (
        <>
            <section className="bg-slate-100">
                <div className="container flex flex-col items-center">
                    <h2 className="text-4xl font-bold">Service Booking</h2>
                    <Breadcrumb>
                        <BreadcrumbItem onClick={() => navigate("/")}>Home</BreadcrumbItem>
                        <BreadcrumbItem onClick={() => navigate("/services")}>
                            <CaretRight size={18} color="#455468" />
                            Services
                        </BreadcrumbItem>
                        <BreadcrumbItem className="cursor-auto hover:text-black">
                            <CaretRight size={18} color="#455468" />
                            Booking
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </section>

            <section className="bg-slate-100">
                <div className="container grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="md:col-span-2">
                        <div className="bg-white p-4 shadow-sm border border-slate-100 rounded-lg space-y-5">
                            <div className="bg-white p-4 border border-slate-200 flex items-center gap-5">
                                <div className="sm:w-40 sm:h-40 overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={serviceData?.image}
                                        alt={serviceData?.name}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <div className="flex items-center gap-1 text-sm font-medium">
                                            <GiDuration className="mt-[1.5px] text-lg" />
                                            <span>{serviceData?.duration} Min</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm font-medium">
                                            <TbCoinTakaFilled className="mt-[1.5px] text-lg" />
                                            <span>{serviceData?.price}</span>
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-semibold">{serviceData?.name}</h4>
                                    <p className="text-slate-700">{serviceData?.description}</p>
                                    <button
                                        className={
                                            "flex items-center justify-center gap-2 px-4 py-1 rounded border transition-all !bg-blue-700 !text-white cursor-pointer"
                                        }
                                    >
                                        <FaCircleCheck />

                                        <span>{serviceData?.slot}</span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-slate-800 mb-3">
                                    Enter Your Details for Booking
                                </h4>
                                <CWSForm resolver={zodResolver(userInfoSchema)} onSubmit={handleBooking}>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-5">
                                            <CWSInput
                                                type="text"
                                                name="fName"
                                                label="First Name"
                                                placeholder="Write your first name"
                                            />
                                            <CWSInput
                                                type="text"
                                                name="lName"
                                                label="Last Name"
                                                placeholder="Write your Last name"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-5">
                                            <CWSInput
                                                type="email"
                                                name="email"
                                                label="Email"
                                                placeholder="Write your email address"
                                            />
                                            <CWSInput
                                                type="text"
                                                name="mobile"
                                                label="Mobile Number"
                                                placeholder="Write your mobile no"
                                            />
                                        </div>
                                            <CWSInput
                                                type="text"
                                                name="address"
                                                label="Address"
                                                placeholder="Write your present address"
                                            />
                                        <Button
                                            type="submit"
                                            className={`bg-cws-yellow hover:bg-cws-yellow/90 min-w-56 ${
                                                isLoading
                                                    ? "bg-cws-yellow/65 hover:bg-cws-yellow/65"
                                                    : "bg-cws-yellow"
                                            }`}
                                        >
                                            {isLoading ? (
                                                <CgSpinnerTwo className="animate-spin text-white text-2xl" />
                                            ) : (
                                                "Complete Booking & Payment"
                                            )}
                                        </Button>
                                    </div>
                                </CWSForm>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-white border border-slate-100 rounded-lg p-4">
                            <h4 className="text-lg font-bold text-slate-800 mb-3">
                                Payment Summery
                            </h4>
                            <div className="border border-slate-200 p-4 space-y-1">
                                <div className="text-slate-700 font-medium">
                                    <span>Time: </span>
                                    <span>{serviceData?.duration} Min</span>
                                </div>
                                <div className="text-slate-700 font-medium">
                                    <span>Time Slot: </span>
                                    <span>{serviceData?.slot}</span>
                                </div>
                                <div className="text-slate-700 font-medium">
                                    <span>Subtotal Price: </span>
                                    <span>{serviceData?.price}</span>
                                </div>
                                <div className="text-blue-700 font-medium border-t pt-2 !mt-3">
                                    <span>Total Price: </span>
                                    <span>{serviceData?.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Booking;
