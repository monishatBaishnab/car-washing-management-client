import { Breadcrumb, BreadcrumbItem, Label, Radio, Slider } from "keep-react";
import { CaretRight } from "phosphor-react";
import DetailsServiceCard from "../../components/ui/DetailsServiceCard";
import { useFetchAllServicesQuery } from "../../redux/features/services/services.api";
import { TService } from "../../types";

const Services = () => {
    const { data: services } = useFetchAllServicesQuery([{ name: "featured", value: true },{ name: "price", value: '199' }]);

    return (
        <>
            <section className="bg-slate-100">
                <div className="container flex flex-col items-center">
                    <h2 className="text-4xl font-bold">All Services</h2>
                    <Breadcrumb>
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>
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
                                <div className="bg-white p-5">
                                    <h4 className="text-lg font-semibold border-b border-b-slate-200 pb-2 mb-4">
                                        Price Range
                                    </h4>
                                    <Slider min={0} max={100} defaultValue={[33, 75]} />
                                </div>
                                <div className="bg-white p-5">
                                    <h4 className="text-lg font-semibold border-b border-b-slate-200 pb-2 mb-4">
                                        Sort by
                                    </h4>
                                    <form className="flex flex-col gap-2">
                                        <fieldset className="flex items-center gap-2">
                                            <Radio id="price" name="sort" />
                                            <Label htmlFor="price">Price</Label>
                                        </fieldset>
                                        <fieldset className="flex items-center gap-2">
                                            <Radio id="duration" name="sort" />
                                            <Label htmlFor="duration">Duration</Label>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-2 gap-5 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {services?.data?.map((service: TService) => (
                                <DetailsServiceCard key={service._id} service={service} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;
