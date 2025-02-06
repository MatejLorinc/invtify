import Hero from "@/app/frontpage/hero";
import Navbar from "@/app/components/navbar";
import About from "@/app/frontpage/about";
import Strategies from "@/app/frontpage/strategies";
import Brokers from "@/app/frontpage/brokers";

export default function Home() {
    return (
        <div>
            <Navbar items={[
                {name: "About", href: "#about"},
                {name: "Strategies", href: "#strategies"},
                {name: "Brokers & Exchanges", href: "#brokers"}
            ]}/>
            <Hero/>
            <About/>
            <Strategies/>
            <Brokers/>
        </div>
    );
}
