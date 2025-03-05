import Image from "next/image";
import {FaArrowRight} from "react-icons/fa6";
import {RiExchangeFundsFill} from "react-icons/ri";
import InvestmentChart from "@/app/(app)/components/investment/investment-chart";
import {InvestmentModel} from "@/app/models/investment/investment";
import {InvestmentInfoComponent} from "@/app/(app)/components/investment/investment-info";
import {DeleteInvestment} from "@/app/(app)/components/investment/delete-investment";
import {formatCurrency, formatPercentage} from "@/app/helpers/format";

export default function Investment({accessToken, id, investmentModel}: { accessToken: string, id: number, investmentModel: InvestmentModel }) {
    return <div className="basis-1/3 flex-grow min-w-80 rounded shadow-lg">
        <InvestmentHeader accessToken={accessToken} id={id} investmentModel={investmentModel}/>
        <div className="flex gap-2 m-2 flex-wrap">
            <InvestmentValue id={id} investmentModel={investmentModel}/>
            <InvestmentInfoComponent header="Strategy" info={investmentModel.strategy.displayName} icon={<RiExchangeFundsFill size="2rem"/>}/>
            <InvestmentInfoComponent header="Exchange" info={investmentModel.asset.broker.displayName}
                                     icon={<Image src="/assets/icons/broker.png" alt="broker" width={32}
                                                  height={32}/>}/>
            <InvestmentInfoComponent header="Frequency" info={investmentModel.getFrequencyDatetime()}
                                     icon={<Image src="/assets/icons/calendar.svg" alt="calendar" width={32}
                                                  height={32}/>}/>
            <InvestmentInfoComponent header="Purchase Worth" info={investmentModel.getCurrencyAmount()}
                                     icon={<Image src="/assets/icons/coins-swap.svg" alt="coins-swap" width={32}
                                                  height={32}/>}/>
        </div>
    </div>;
}

function InvestmentHeader({accessToken, id, investmentModel}: { accessToken: string, id: number, investmentModel: InvestmentModel }) {
    return <div className="flex items-center justify-between p-4 rounded-t bg-black/5">
        <div className="flex gap-4 items-center justify-center">
            <Image src={"/assets/icons/" + investmentModel.asset.icon} alt={investmentModel.asset.asset} width={32} height={32}
                   className="w-[32px] h-[32px] object-contain"/>
            <div className="font-medium flex items-center gap-1 text-sm">
                <p>{investmentModel.asset.currency}</p>
                <FaArrowRight/>
                <p>{investmentModel.asset.asset}</p>
            </div>
        </div>
        <div className="text-sm text-right flex gap-4">
            <div>
                <p className="">Created</p>
                <p className="font-medium">{investmentModel.createdAt.toLocaleDateString()}</p>
            </div>
            <DeleteInvestment accessToken={accessToken} investmentId={investmentModel.uniqueId}/>
        </div>
    </div>;
}

function InvestmentValue({id, investmentModel}: { id: number, investmentModel: InvestmentModel }) {
    return <div className="flex basis-full flex-grow min-w-64 rounded justify-between items-center">
        <div className="flex flex-col min-w-fit gap-2">
            <div className="rounded p-2 px-4 bg-secondary-400/15">
                <p className="text-secondary-400 font-medium">Current Value</p>
                <span className="flex items-center gap-2 flex-nowrap">
                            <Image src="/assets/icons/coins-primary.svg" alt="broker" width={24} height={24}/>
                            <p className="text-secondary-400 font-medium text-xl">{formatCurrency(investmentModel.currentValue)}</p>
                        </span>
            </div>
            <div className="rounded p-2 px-4 bg-sky-400/15">
                <p className="text-sky-400 font-medium">Totally Invested</p>
                <span className="flex items-center gap-2 flex-nowrap">
                            <Image src="/assets/icons/coins-blue.svg" alt="broker" width={24} height={24}/>
                            <p className="text-sky-400 font-medium text-xl">{formatCurrency(investmentModel.totallyInvested)}</p>
                        </span>
            </div>
        </div>
        <InvestmentGain id={id} investmentModel={investmentModel}/>
    </div>;
}

function InvestmentGain({id, investmentModel}: { id: number, investmentModel: InvestmentModel }) {
    const sign = investmentModel.rateOfReturn >= 0 ? "+ " : "- ";

    const data = [
        {date: new Date(2024, 4, 27), value: 1},
        {date: new Date(2024, 4, 28), value: 1.1},
        {date: new Date(2024, 4, 29), value: 1.2},
        {date: new Date(2024, 4, 30), value: 1.3},
        {date: new Date(2024, 4, 31), value: 1.25},
        {date: new Date(2024, 5, 1), value: 1.35},
        {date: new Date(2024, 5, 2), value: 1.4},
        {date: new Date(2024, 5, 3), value: 1.6},
        {date: new Date(2024, 5, 4), value: 1.55},
        {date: new Date(2024, 5, 5), value: 1.7},
        {date: new Date(2024, 5, 6), value: 1.68},
        {date: new Date(2024, 5, 7), value: 1.75},
        {date: new Date(2024, 5, 8), value: 1.8},
        {date: new Date(2024, 5, 9), value: 1.9},
        {date: new Date(2024, 5, 10), value: 2}
    ];

    return <div className="flex flex-col text-center flex-grow h-full overflow-hidden">
        <div className="flex flex-col basis-0 flex-grow justify-center">
            <p className="text-secondary-400 font-medium text-lg">{sign + formatPercentage(investmentModel.rateOfReturn)}</p>
            <p className="font-medium text-xl">{sign + formatCurrency(investmentModel.profitLoss)}</p>
        </div>
        <InvestmentChart id={id} data={data}/>
    </div>;
}