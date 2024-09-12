import empty_image from "../../../assets/images/empty-bookings.svg";

const EmptySlot = () => {
    return (
        <div className="flex items-center flex-col p-5 sm:col-span-3 md:col-span-2 lg:col-span-3">
            <div className="w-40 h-28 overflow-hidden">
                <img className="w-full h-full object-contain" src={empty_image} alt="Empty Image" />
            </div>
            <h3 className="text-xl text-slate-500 font-bold">
                No available slots for the selected date.
            </h3>
        </div>
    );
};

export default EmptySlot;
