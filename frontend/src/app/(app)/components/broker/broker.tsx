import Image from "next/image";
import React from "react";
import {BrokerModel} from "@/app/models/broker/investment-broker";
import {BrokerAvailableBalance, BrokerToken, BrokerUsedBalance} from "@/app/(app)/components/broker/broker-information";
import {DeleteBroker} from "@/app/(app)/components/broker/delete-broker";

export default function Broker({accessToken, id, brokerModel}: { accessToken: string, id: number, brokerModel: BrokerModel }) {
    return <div className="basis-1/3 flex-grow min-w-80 rounded shadow-lg">
        <BrokerHeader accessToken={accessToken} brokerModel={brokerModel}/>
        <div className="flex gap-2 m-2 flex-col">
            <BrokerUsedBalance totalBalance={brokerModel.totalBalance} investedBalance={brokerModel.investedBalance}/>
            <BrokerAvailableBalance availableBalance={brokerModel.availableBalance} reservesLifetime={brokerModel.getReservesLifetime()}/>
            <BrokerToken brokerToken={brokerModel.tokenModel.token} accessToken={accessToken} brokerId={brokerModel.tokenModel.broker.id}
                         brokerName={brokerModel.tokenModel.broker.displayName}/>
        </div>
    </div>;
}

function BrokerHeader({accessToken, brokerModel}: { accessToken: string, brokerModel: BrokerModel }) {
    return <div className="flex items-center justify-between p-4 rounded-t bg-black/5">
        <div className="flex gap-4">
            <Image src={"/assets/brokers/" + brokerModel.tokenModel.broker.icon} alt={brokerModel.tokenModel.broker.displayName} width={96} height={16}/>
        </div>
        <DeleteBroker accessToken={accessToken} brokerId={brokerModel.tokenModel.broker.id}/>
    </div>;
}
