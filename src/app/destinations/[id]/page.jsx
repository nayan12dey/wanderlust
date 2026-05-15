import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";


const DestinationDetailsPage = async ({ params }) => {

    const { id } = await params
    const res = await fetch(`http://localhost:5000/destination/${id}`)
    const destination = await res.json()

    console.log(destination);

    const {imageUrl, price, destinationName, duration, country, description} = destination;

    return (
        <div className="max-w-7xl mx-auto my-6">
            <Image src={imageUrl} height={500} width={800} alt={destinationName}></Image>

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


                            <h3 className="text-2xl font-bold">${price}</h3>
                        </div>
                    </div>  
                </div>

                <h1 className="mt-10 text-2xl font-bold">Overview</h1>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default DestinationDetailsPage;