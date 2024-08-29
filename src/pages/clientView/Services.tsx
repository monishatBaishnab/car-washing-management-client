import {
    Breadcrumb,
    BreadcrumbItem,
    Empty,
    EmptyDescription,
    EmptyImage,
    EmptyTitle,
    Input,
    Label,
    Radio,
    Slider,
} from "keep-react";
import { CaretRight } from "phosphor-react";
import DetailsServiceCard from "../../components/ui/DetailsServiceCard";
import { useFetchAllServicesQuery } from "../../redux/features/services/services.api";
import { TService } from "../../types";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

const priceRanges = [
    { label: "0-200", priceRange: [0, 200] },
    { label: "200-400", priceRange: [200, 400] },
    { label: "400-600", priceRange: [400, 600] },
    { label: "600-800", priceRange: [600, 800] },
    { label: "800-1000", priceRange: [800, 1000] },
];

const Services = () => {
    const navigate = useNavigate();
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");
    const [priceRange, setPriceRange] = useState<number[] | []>([0, 1000]);
    const { data: services } = useFetchAllServicesQuery([
        { name: "name", value: search },
        { name: "priceRange", value: priceRange },
        { name: "sort", value: sort },
    ]);

    const onPriceValueChange = (value: number[]) => {
        setTimeout(() => {
            setPriceRange(value);
        }, 300);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.id;
        setTimeout(() => {
            if (name === "search") setSearch(e.target.value);
        }, 300);

        if (name === "sort") setSort(value);

        if (name === "priceRange") setPriceRange(value.split(",").map((item) => Number(item)));
    };

    return (
        <>
            <section className="bg-slate-100">
                <div className="container flex flex-col items-center">
                    <h2 className="text-4xl font-bold">All Services</h2>
                    <Breadcrumb>
                        <BreadcrumbItem onClick={() => navigate("/")}>Home</BreadcrumbItem>
                        <BreadcrumbItem className="cursor-auto hover:text-black">
                            <CaretRight size={18} color="#455468" />
                            Services
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </section>
            <section className="bg-slate-50">
                <div className="container">
                    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div>
                            <div className=" border border-slate-200">
                                <div className="bg-white p-5 pb-0">
                                    <h4 className="text-lg font-semibold border-b border-b-slate-200 pb-2 mb-4">
                                        Search Service
                                    </h4>
                                    <Input
                                        name="search"
                                        placeholder="Write service name..."
                                        onChange={(e) => handleChange(e)}
                                        className="focus-visible:!ring-0 focus-visible:!ring-offset-0 focus-visible:border-cws-yellow"
                                    />
                                </div>
                                <div className="bg-white p-5 pb-0">
                                    <h4 className="text-lg font-semibold border-b border-b-slate-200 pb-2 mb-4">
                                        Price Range
                                    </h4>
                                    <Slider
                                        onValueChange={onPriceValueChange}
                                        min={0}
                                        max={1000}
                                        defaultValue={[0, 1000]}
                                    />
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-slate-700">{priceRange[0]}</span>
                                        <span className="text-slate-700">{priceRange[1]}</span>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-2">
                                        {priceRanges?.map((range) => (
                                            <fieldset
                                                key={range.label}
                                                className="flex items-center gap-2"
                                            >
                                                <Radio
                                                    onChange={(e) => handleChange(e)}
                                                    id={String(range.priceRange)}
                                                    name="priceRange"
                                                />
                                                <Label htmlFor={String(range.priceRange)}>
                                                    {range.label}
                                                </Label>
                                            </fieldset>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white p-5">
                                    <h4 className="text-lg font-semibold border-b border-b-slate-200 pb-2 mb-4">
                                        Sort by
                                    </h4>
                                    <div className="flex flex-col gap-2">
                                        <fieldset className="flex items-center gap-2">
                                            <Radio
                                                defaultChecked={sort === "price"}
                                                onChange={(e) => handleChange(e)}
                                                id="price"
                                                name="sort"
                                            />
                                            <Label htmlFor="price">Price</Label>
                                        </fieldset>
                                        <fieldset className="flex items-center gap-2">
                                            <Radio
                                                defaultChecked={sort === "duration"}
                                                onChange={(e) => handleChange(e)}
                                                id="duration"
                                                name="sort"
                                            />
                                            <Label htmlFor="duration">Duration</Label>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {services?.data?.length > 0 ? (
                            <div className="md:col-span-2 gap-5 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {services?.data?.map((service: TService) => (
                                    <div key={service._id}>
                                        <DetailsServiceCard service={service} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="col-span-3">
                                <Empty>
                                    <EmptyImage>
                                        <img
                                            src="https://staticmania.cdn.prismic.io/staticmania/a8befbc0-90ae-4835-bf37-8cd1096f450f_Property+1%3DSearch_+Property+2%3DSm.svg"
                                            height={234}
                                            width={350}
                                            alt="404"
                                        />
                                    </EmptyImage>
                                    <EmptyTitle className="mb-[14px] mt-5">
                                        Sorry, No Services Available!
                                    </EmptyTitle>
                                    <EmptyDescription className="mb-8">
                                        We couldn't find any services matching your criteria. Please
                                        try adjusting your filters or check back later for updates.
                                        We're constantly adding new services, so be sure to visit us
                                        again soon!
                                    </EmptyDescription>
                                </Empty>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;
