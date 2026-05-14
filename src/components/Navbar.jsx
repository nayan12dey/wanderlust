import Image from "next/image";
import Link from "next/link";



const Navbar = () => {
    return (
        <nav className="flex justify-between bg-white p-5">
            <ul className="flex gap-3">
                <li><Link href={"/"}>Home</Link></li>
                <li><Link href={"/destinations"}>Destinations</Link></li>
                <li><Link href={"/my-bookings"}>My Bookings</Link></li>
            </ul>

            <div>
                <Image src={"/assets/wanderlust.png"} width={150} height={150} alt="logo"></Image>
            </div>

            <ul className="flex gap-3">
                <li><Link href={"/profile"}>Profile</Link></li>
                <li><Link href={"/login"}>Login</Link></li>
                <li><Link href={"/signup"}>Sign Up</Link></li>
            </ul>

        </nav>
    );
};

export default Navbar;