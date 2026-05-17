import BookingCard from "@/components/BookingCard";
import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";

const DestinationDetailsPage = async ({ params }) => {
    const { id } = await params;
    let destination = null;

    if (id) {
        try {
            const res = await fetch(`http://localhost:5000/destination/${id}`, {
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.status}`);
            }

            destination = await res.json();
        } catch (err) {
            console.error("Failed to fetch destination:", err);
        }
    }

    if (!destination) {
        return (
            <div className="max-w-7xl mx-auto my-6 text-center">
                <p className="text-xl text-gray-500">Destination not found or failed to load.</p>
            </div>
        );
    }

    const { imageUrl, price, destinationName, duration, country, description } = destination;

    return (
        <div className="max-w-7xl mx-auto my-6">
            <div className="flex justify-end items-center gap-3">
                <EditModal destination={destination} />
                <DeleteAlert destination={destination} />
            </div>

            <Image
                src={imageUrl}
                height={500}
                width={800}
                alt={destinationName}
                className="w-full h-100 object-cover"
            />

            <div className="flex justify-between">
                <div className="p-2">
                    <div className="flex items-center gap-1">
                        <LuMapPin />
                        <span>{country}</span>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold">{destinationName}</h2>
                        <div className="flex gap-1 items-center">
                            <FaRegCalendar />
                            <span>{duration}</span>
                        </div>
                    </div>

                    <h1 className="mt-10 text-2xl font-bold">Overview</h1>
                    <p>{description}</p>
                </div>

                <BookingCard destination={destination} />
            </div>
        </div>
    );
};

export default DestinationDetailsPage;