import Hero from "@/app/(components)/frontpage/Hero";
import Navbar from "@/app/(components)/navbar";
import About from "@/app/(components)/frontpage/About";
import Strategies from "@/app/(components)/frontpage/Strategies";
import Brokers from "@/app/(components)/frontpage/Brokers";

export default function Home() {
    return (
        <div>
            <Navbar items={[
                {name: "About", href: "#about"},
                {name: "Our Strategies", href: "#strategies"},
                {name: "Brokers & Exchanges", href: "#brokers"}
            ]}/>
            <Hero/>
            <About/>
            <Strategies/>
            <Brokers/>
        </div>
    );
}
