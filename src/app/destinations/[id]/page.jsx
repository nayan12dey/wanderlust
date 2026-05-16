import BookingCard from "@/components/BookingCard";
import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import { Button } from "@heroui/react";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { FaRegCalendar } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";


const DestinationDetailsPage = async ({ params }) => {

    const { id } = await params
    const res = await fetch(`http://localhost:5000/destination/${id}`)
    const destination = await res.json()

    console.log(destination);

    const { imageUrl, price, destinationName, duration, country, description } = destination;

    return (
        <div className="max-w-7xl mx-auto my-6">

            <div className="flex justify-end items-center gap-3">
                <EditModal destination={destination}></EditModal>
                <DeleteAlert destination={destination}></DeleteAlert>
            </div>


            <Image src={imageUrl} height={500} width={800} alt={destinationName} className="w-full h-100 object-cover"></Image>

            <div className="flex justify-between">
                <div className="p-2">
                    <div className="flex items-center">
                        {" "}
                        <LuMapPin /> <span>{country}</span>
                    </div>

                    <div>
                        <div>
                            <div>
                                <h2 className="text-xl font-bold">{destinationName}</h2>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex gap-1 items-center">
                                    <FaRegCalendar></FaRegCalendar>{duration}
                                </div>



                            </div>
                        </div>
                    </div>

                    <h1 className="mt-10 text-2xl font-bold">Overview</h1>
                    <p>{description}</p>
                </div>

                <BookingCard destination={destination}></BookingCard>
            </div>
        </div>
    );
};

export default DestinationDetailsPage;