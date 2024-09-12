import Countdown from "react-countdown";
import { RxDot } from "react-icons/rx";
import { TFormattedBooking } from "../../../types";

type TCounter = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
};

const CountdownTimer = ({
    isLoading,
    data,
}: {
    isLoading?: boolean;
    data: TFormattedBooking[];
}) => {
    if (isLoading) {
        return <div className="w-full h-[210px] bg-gray-100 animate-pulse rounded"></div>;
    }

    if (!data?.length) {
        return;
    }

    const booking = data?.[0];
    const renderer = ({ days, hours, minutes, seconds, completed }: TCounter) => {
        if (completed) {
            return;
        } else {
            const formatNumber = (num: number) => String(num).padStart(2, "0");

            return (
                <div className="flex items-center justify-center flex-col  space-y-5 !mt-0 !pt-0">
                    <h2 className="text-xl sm:text-3xl text-cws-yellow uppercase font-bold">
                        Next Service Starts Soon...
                    </h2>
                    <div className="flex items-center gap-3">
                        <TimeBlock hiddenOnMobile label="Days" value={formatNumber(days)} />
                        <DotGroup hiddenOnMobile />
                        <TimeBlock label="Hours" value={formatNumber(hours)} />
                        <DotGroup />
                        <TimeBlock label="Minutes" value={formatNumber(minutes)} />
                        <DotGroup />
                        <TimeBlock label="Seconds" value={formatNumber(seconds)} />
                    </div>
                </div>
            );
        }
    };
    const [month, day, year] = booking?.date?.split("/") ?? [];
    // Create a new Date object using the split parts
    const dateStr = `${year}-${month}-${day}T${booking?.startTime}`;

    return <Countdown date={new Date(dateStr)} renderer={renderer} />;
};

export default CountdownTimer;

const TimeBlock = ({
    label,
    value,
    hiddenOnMobile,
}: {
    label: string;
    value: string;
    hiddenOnMobile?: boolean;
}) => {
    return (
        <div className={`text-center ${hiddenOnMobile ? "hidden md:block" : ""}`}>
            <h6 className="text-lg text-gray-500 uppercase">{label}</h6>
            <h2 className="text-3xl sm:text-5xl text-gray-700">{value}</h2>
        </div>
    );
};

const DotGroup = ({ hiddenOnMobile }: { hiddenOnMobile?: boolean }) => {
    return (
        <div
            className={`flex items-center justify-center flex-col h-full w-full ${
                hiddenOnMobile ? "hidden md:flex" : ""
            }`}
        >
            <RxDot className="text-lg text-gray-700" />
            <RxDot className="text-lg text-gray-700" />
        </div>
    );
};
