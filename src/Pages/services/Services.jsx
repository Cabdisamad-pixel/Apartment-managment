import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";


import Breadcrumb from "./components/Breadcrumb";
import PageHeader from "./components/PageHeader";
import Filters from "./components/Filters";
import ServiceCard from "./components/ServiceCard";
import servicesData from "./data/servicesData";


const Services = () => {

    const [services, setServices] = useState(servicesData);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("All");

    const filteredServices = useMemo(() => {

        return services.filter(service => {

            const searchMatch =
                service.title.toLowerCase().includes(search.toLowerCase()) ||
                service.category.toLowerCase().includes(search.toLowerCase()) ||
                service.apartment.toLowerCase().includes(search.toLowerCase()) ||
                service.id.toLowerCase().includes(search.toLowerCase());

            const statusMatch =
                status === "All"
                    ? true
                    : service.status === status;

            return searchMatch && statusMatch;

        });

    }, [services, search, status]);

    return (

        <section className="bg-slate-50 min-h-screen p-8">

            <Breadcrumb />

            <PageHeader />

            <div className="mt-8 flex justify-between items-center">

                <Filters
                    search={search}
                    setSearch={setSearch}
                    status={status}
                    setStatus={setStatus}
                />

                <button
                    className="bg-emerald-500 hover:bg-emerald-600 transition text-white rounded-lg px-5 py-3 flex items-center gap-2">

                    <FiPlus />

                    Create Request

                </button>

            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">

                {filteredServices.map(service => (

                    <div
                        key={service.id}
                        className="bg-white rounded-xl border border-gray-200 p-6">

                        <ServiceCard
                            key={service.id}
                            service={service}
                        />

                    </div>

                ))}

            </div>

        </section>

    );

};

export default Services;