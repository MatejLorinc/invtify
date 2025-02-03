import Broker from "@/app/(app)/components/broker/broker";
import {getBrokers} from "@/app/(services)/broker.service";

export const dynamic = "force-dynamic",
    revalidate = 0;

export default async function Brokers({accessToken}: { accessToken: string }) {
    const brokers = await getBrokers(accessToken); //TODO get brokers

    return <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <h1 className="text-lg font-medium">Connected Brokers</h1>
            <AddBroker/>
        </div>
        <div className="flex flex-wrap gap-4">
            {brokers.map((broker, index) =>
                <Broker key={index} brokerModel={broker} id={index}/>
            )}
            {brokers.length % 2 == 1 ? <div className="basis-1/3 flex-grow min-w-80"/> : ""}
        </div>
    </div>;
}

function AddBroker() {
    return <div
        className="items-center rounded-xl overflow-hidden shadow-lg bg-secondary-900 transition duration-300 hover:bg-secondary-700 cursor-pointer">
        {/*TODO: On click add new broker*/}
        <p
            className="rounded-md bg-primary-400 text-sm font-medium px-3 py-2 mt-auto text-white shadow-sm transition ease-in-out hover:bg-primary-300 duration-300 cursor-pointer">
            New Connection
        </p>
    </div>;
}
