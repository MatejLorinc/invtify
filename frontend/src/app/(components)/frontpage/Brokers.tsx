import Image from "next/image";

export default function Brokers() {
    return (
        <section className="bg-white" id="brokers">
            <div className="py-16 text-center">
                <h2 className="text-2xl font-semibold mb-6">Supported brokers/exchanges</h2>
                <div className="flex justify-center gap-10 flex-wrap">
                    <div className="flex items-center">
                        <a href="https://www.trading212.com" target="_blank" rel="noopener noreferrer">
                            <Image
                                src="/assets/brokers/trading212.png"
                                alt="Trading 212 logo"
                                className="mx-2"
                                width={128}
                                height={48}
                            />
                        </a>
                    </div>
                    <div className="flex items-center">
                        <a href="https://www.xtb.com" target="_blank" rel="noopener noreferrer">
                            <Image
                                src="/assets/brokers/xtb.png"
                                alt="XTB logo"
                                className="mx-2"
                                width={128}
                                height={48}
                            />
                        </a>
                    </div>
                    <div className="flex items-center">
                        <a href="https://www.binance.com" target="_blank" rel="noopener noreferrer">
                            <Image
                                src="/assets/brokers/binance.png"
                                alt="Binance logo"
                                className="mx-2"
                                width={128}
                                height={48}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}