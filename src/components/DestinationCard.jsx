import { Calendar } from "@heroui/react";
import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";



const DestinationCard = ({ destination }) => {
    const { imageUrl, price, destinationName, duration, country } = destination;



    return (
        <div className="border">
            <Image alt="destinationName" src={imageUrl} height={400} width={400}></Image>

            <div className="p-2">
                <div className="flex items-center">
                    {" "}
                    <LuMapPin /> <span>{country}</span>
                </div>

                <div className="flex justify-between">
                    <div>
                        <div>
                            <h2 className="text-xl font-bold">{destinationName}</h2>
                        </div>

                        <div className="flex gap-1 items-center">
                            <FaRegCalendar></FaRegCalendar>{duration}
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold">${price}</h3>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DestinationCard;