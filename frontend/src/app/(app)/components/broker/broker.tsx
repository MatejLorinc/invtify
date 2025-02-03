import Image from "next/image";
import React from "react";
import {FaTrash} from "react-icons/fa6";
import {BrokerModel} from "@/app/(models)/broker/investment-broker";
import {BrokerAvailableBalance, BrokerToken, BrokerUsedBalance} from "@/app/(app)/components/broker/broker-information";

export default function Broker({id, brokerModel}: { id: number, brokerModel: BrokerModel }) {
    return <div className="basis-1/3 flex-grow min-w-80 rounded shadow-lg">
        <BrokerHeader brokerModel={brokerModel}/>
        <div className="flex gap-2 m-2 flex-col">
            <BrokerUsedBalance totalBalance={brokerModel.totalBalance} investedBalance={brokerModel.investedBalance}/>
            <BrokerAvailableBalance availableBalance={brokerModel.availableBalance} reservesLifetime={brokerModel.getReservesLifetime()}/>
            <BrokerToken brokerToken={brokerModel.tokenModel.token}/>
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
