import Image from "next/image";
import {FaArrowRight} from "react-icons/fa6";
import {RiExchangeFundsFill} from "react-icons/ri";
import InvestmentChart from "@/app/(app)/components/investment/investment-chart";
import {InvestmentModel} from "@/app/(models)/investment/investment";
import {InvestmentInfoComponent} from "@/app/(app)/components/investment/investment-info";

export default function Investment({id, investmentModel}: { id: number, investmentModel: InvestmentModel }) {
    return <div className="basis-1/3 flex-grow min-w-80 rounded shadow-lg">
        <InvestmentHeader id={id} investmentModel={investmentModel}/>
        <div className="flex gap-2 m-2 flex-wrap">
            <InvestmentValue id={id}/>
            <InvestmentInfoComponent header="Strategy" info={investmentModel.strategy.displayName} icon={<RiExchangeFundsFill size="2rem"/>}/>
            <InvestmentInfoComponent header="Exchange" info={investmentModel.asset.broker.displayName}
                                     icon={<Image src="/assets/icons/broker.png" alt="broker" width={32}
                                                  height={32}/>}/>
            <InvestmentInfoComponent header="Frequency" info={investmentModel.getFrequencyDatetime()}
                                     icon={<Image src="/assets/icons/calendar.svg" alt="calendar" width={32}
                                                  height={32}/>}/>
            <InvestmentInfoComponent header="Purchase worth" info={investmentModel.getCurrencyAmount()}
                                     icon={<Image src="/assets/icons/coins-swap.svg" alt="coins-swap" width={32}
                                                  height={32}/>}/>
        </div>
    </div>;
}

function InvestmentHeader({id, investmentModel}: { id: number, investmentModel: InvestmentModel }) {
    return <div className="flex items-center justify-between p-4 rounded-t bg-black/5">
        <div className="flex gap-4">
            <Image src={"/assets/icons/" + investmentModel.asset.icon} alt={investmentModel.asset.asset} width={32} height={32}/>
            <div>
                <div className="font-medium flex items-center gap-1">
                    <p>{investmentModel.asset.currency}</p>
                    <FaArrowRight/>
                    <p>{investmentModel.asset.asset}</p>
                </div>
                <p className="text-sm overflow-hidden max-w-40">Description</p>
            </div>
        </div>
        <div className="text-sm text-right">
            <p className="">Created</p>
            <p className="font-medium">{investmentModel.createdAt.toLocaleDateString()}</p>
        </div>
    </div>;
}

function InvestmentValue({id}: { id: number }) {
    return <div className="flex basis-full flex-grow min-w-64 rounded justify-between items-center">
        <div className="flex flex-col min-w-fit gap-2">
            <div className="rounded p-2 px-4 bg-secondary-400/15">
                <p className="text-secondary-400 font-medium">Current Value</p>
                <span className="flex items-center gap-2 flex-nowrap">
                            <Image src="/assets/icons/coins-primary.svg" alt="broker" width={24} height={24}/>
                            <p className="text-secondary-400 font-medium text-xl">12 345,67 €</p>
                        </span>
            </div>
            <div className="rounded p-2 px-4 bg-sky-400/15">
                <p className="text-sky-400 font-medium">Totally Invested</p>
                <span className="flex items-center gap-2 flex-nowrap">
                            <Image src="/assets/icons/coins-blue.svg" alt="broker" width={24} height={24}/>
                            <p className="text-sky-400 font-medium text-xl">7500,00 €</p>
                        </span>
            </div>
        </div>
        <InvestmentGain id={id}/>
    </div>;
}

function InvestmentGain({id}: { id: number }) {
    return <div className="flex flex-col text-center flex-grow h-full overflow-hidden">
        <div className="flex flex-col basis-0 flex-grow justify-center">
            <p className="text-secondary-400 font-medium text-lg">+ 64,61%</p>
            <p className="font-medium text-xl">+ 4845,67 €</p>
        </div>
        <InvestmentChart id={id}/>
    </div>;
}