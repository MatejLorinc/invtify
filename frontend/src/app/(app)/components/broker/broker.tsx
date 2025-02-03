import Image from "next/image";
import {RiHourglassFill} from "react-icons/ri";
import {ReactElement} from "react";
import {FaPen, FaTrash} from "react-icons/fa6";
import {HiOutlineCash} from "react-icons/hi";
import {AiOutlineStock} from "react-icons/ai";
import {BrokerModel} from "@/app/(models)/broker/investment-broker";
import {formatCurrency} from "@/app/(helpers)/format";

export default function Broker({id, brokerModel}: { id: number, brokerModel: BrokerModel }) {
    return <div className="basis-1/3 flex-grow min-w-80 rounded shadow-lg">
        <BrokerHeader brokerModel={brokerModel}/>
        <div className="flex gap-2 m-2 flex-col">
            <BrokerUsedBalance brokerModel={brokerModel}/>
            <BrokerAvailableBalance brokerModel={brokerModel}/>
            <BrokerToken brokerModel={brokerModel}/>
        </div>
    </div>;
}

function BrokerHeader({brokerModel}: { brokerModel: BrokerModel }) {
    return <div className="flex items-center justify-between p-4 rounded-t bg-black/5">
        <div className="flex gap-4">
            <Image src={"/assets/brokers/" + brokerModel.tokenModel.broker.icon} alt={brokerModel.tokenModel.broker.displayName} width={128} height={32}/>
        </div>
        <div className="text-sm p-3 rounded-full transition duration-300 ease-in-out hover:bg-black/10 cursor-pointer">
            <FaTrash/>
        </div>
    </div>;
}

function BrokerUsedBalance({brokerModel}: { brokerModel: BrokerModel }) {
    return <div className="flex flex-wrap gap-2">
        <BrokerBalanceComponent header="Total Balance" info={formatCurrency(brokerModel.totalBalance)}
                                icon={<Image src="/assets/icons/coins-black.svg" alt="broker" width={24} height={24}/>
                                }/>
        <BrokerBalanceComponent header="Invested Balance" info={formatCurrency(brokerModel.investedBalance)} icon={<AiOutlineStock size="2rem"/>}/>

    </div>
}

function BrokerBalanceComponent({header, info, icon}: { header: string, info: string, icon: ReactElement }) {
    return <div
        className="flex basis-0 flex-grow min-w-64 rounded p-2 px-4 bg-black/5 justify-between items-center">
        <div>
            <p className="font-medium">{header}</p>
            <p className="text-sm">{info}</p>
        </div>
        <div className="opacity-75 my-2">
            {icon}
        </div>
    </div>;
}

function BrokerAvailableBalance({brokerModel}: { brokerModel: BrokerModel }) {
    return <div className="flex flex-wrap bg-black/5">
        <BrokerAvailableBalanceComponent header="Available Balance" info={formatCurrency(brokerModel.availableBalance)} icon={<HiOutlineCash size="2rem"/>}/>
        <BrokerAvailableBalanceComponent header="Runs Out In" info={brokerModel.getReservesLifetime()} icon={<RiHourglassFill size="2rem"/>}/>
    </div>
}

function BrokerAvailableBalanceComponent({header, info, icon}: { header: string, info: string, icon: ReactElement }) {
    return <div
        className="flex basis-0 flex-grow min-w-64 rounded p-2 px-4 justify-between items-center">
        <div>
            <p className="font-medium">{header}</p>
            <p className="text-sm">{info}</p>
        </div>
        <div className="opacity-75 my-2">
            {icon}
        </div>
    </div>;
}

function BrokerToken({brokerModel}: { brokerModel: BrokerModel }) {
    const token = brokerModel.tokenModel.token;

    return <div className="flex gap-2">
        <div
            className="flex basis-0 flex-grow min-w-64 rounded-full p-2 px-4 bg-black/5 justify-between items-center cursor-pointer hover:bg-black/10 transition duration-300">
            token.replace(/./g, '*')
        </div>
        <div className="text-sm p-3 rounded-full bg-black/5 transition duration-300 ease-in-out hover:bg-black/10 cursor-pointer">
            <FaPen/>
        </div>
    </div>
}
