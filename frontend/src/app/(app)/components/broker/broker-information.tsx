"use client"

import {ReactElement, useState} from "react";
import {FaPen} from "react-icons/fa6";
import {formatCurrency} from "@/app/(helpers)/format";
import Image from "next/image";
import {AiOutlineStock} from "react-icons/ai";
import {HiOutlineCash} from "react-icons/hi";
import {RiHourglassFill} from "react-icons/ri";

export function BrokerUsedBalance({totalBalance, investedBalance}: { totalBalance: number, investedBalance: number }) {
    return <div className="flex flex-wrap gap-2">
        <BrokerBalanceComponent header="Total Balance" info={formatCurrency(totalBalance)}
                                icon={<Image src="/assets/icons/coins-black.svg" alt="broker" width={24} height={24}/>
                                }/>
        <BrokerBalanceComponent header="Invested Balance" info={formatCurrency(investedBalance)} icon={<AiOutlineStock size="2rem"/>}/>

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

export function BrokerAvailableBalance({availableBalance, reservesLifetime}: { availableBalance: number, reservesLifetime: string }) {
    return <div className="flex flex-wrap bg-black/5">
        <BrokerAvailableBalanceComponent header="Available Balance" info={formatCurrency(availableBalance)} icon={<HiOutlineCash size="2rem"/>}/>
        <BrokerAvailableBalanceComponent header="Runs Out In" info={reservesLifetime} icon={<RiHourglassFill size="2rem"/>}/>
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

export function BrokerToken({brokerToken}: { brokerToken: string }) {
    const [isHolding, setIsHolding] = useState(false);

    return <div className="flex gap-2"
                onMouseDown={() => setIsHolding(true)}
                onMouseUp={() => setIsHolding(false)}
                onMouseLeave={() => setIsHolding(false)} // Ensures state resets if the user drags away
                onTouchStart={() => setIsHolding(true)}
                onTouchEnd={() => setIsHolding(false)}>
        <div
            className="flex basis-0 flex-grow min-w-64 rounded-full p-2 px-4 bg-black/5 justify-between items-center cursor-pointer hover:bg-black/10 transition duration-300">
            {isHolding ? brokerToken : brokerToken.replace(/./g, '*')}
        </div>
        <div className="text-sm p-3 rounded-full bg-black/5 transition duration-300 ease-in-out hover:bg-black/10 cursor-pointer">
            <FaPen/>
        </div>
    </div>
}