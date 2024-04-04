import Link from "next/link";
import SparkleIcon from "./Sparkle";

export default function Navbar(){
    return(
        <header className="flex items-center justify-between  w-[90%] h-[80px]">
        <Link href="/" className="flex items-center justify-center gap-1 text-xl">
        <SparkleIcon/>
        <span>EpicCaptions</span>
        </Link>
           <nav className="flex gap-6 text-white/80 ">
             <Link href="/">Home</Link>
             <Link href="/pricing">Pricing</Link>
             <Link href="/contact">Contact Us</Link>
           </nav>
         </header>
    );
};