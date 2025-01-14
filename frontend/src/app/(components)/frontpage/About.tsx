import Image from "next/image";

export default function About() {
    return (
        <section className="bg-white" id="about">
            <div
                className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 lg:gap-32 py-16 px-4 mx-auto max-w-screen-xl">
                <div className="font-light text-gray-500 text-lg flex-1 text-left">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
                        Invtify works as an extension above the connected broker
                    </h2>
                    <p>
                        You still keep your money and assets with the selected broker, we will only execute
                        buy/sell orders for you according to the chosen strategy.
                    </p>
                </div>
                <div className="flex-1 flex justify-center">
                    <Image
                        className="mx-auto object-contain"
                        src="/assets/about.png"
                        alt="icon"
                        width={460}
                        height={1080}
                    />
                </div>
            </div>
        </section>
    )
}