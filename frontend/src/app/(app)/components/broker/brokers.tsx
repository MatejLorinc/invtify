import Broker from "@/app/(app)/components/broker/broker";
import {getBrokers} from "@/app/(services)/broker.service";
import {AddBroker} from "@/app/(app)/components/broker/new-broker";

export const dynamic = "force-dynamic",
    revalidate = 0;

export default async function Brokers({accessToken}: { accessToken: string }) {
    const brokers = await getBrokers(accessToken);
    const brokerIds = brokers.map(broker => broker.tokenModel.broker.id)

    return <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <h1 className="text-lg font-medium">Connected Brokers</h1>
            <AddBroker accessToken={accessToken} brokerIds={brokerIds}/>
        </div>
        <div className="flex flex-wrap gap-4">
            {brokers.map((broker, index) =>
                <Broker key={index} accessToken={accessToken} brokerModel={broker} id={index}/>
            )}
            {brokers.length % 2 == 1 ? <div className="basis-1/3 flex-grow min-w-80"/> : ""}
        </div>
    </div>;
}
