import Investment from "@/app/(app)/components/investment/investment";
import {getInvestments} from "@/app/services/investment.service";
import {AddInvestment} from "@/app/(app)/components/investment/new-investment";
import {getBrokers} from "@/app/services/broker.service";

export const dynamic = "force-dynamic",
    revalidate = 0;

export default async function Investments({accessToken}: { accessToken: string }) {
    const investments = await getInvestments(accessToken);
    const brokers = await getBrokers(accessToken);
    const tokenDtos = brokers.map(broker => {
        return {
            brokerId: broker.tokenModel.broker.id,
            token: broker.tokenModel.token
        }
    })


    return <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <h1 className="text-lg font-medium">Investment Strategies</h1>
            <AddInvestment accessToken={accessToken} brokers={tokenDtos}/>
        </div>
        <div className="flex flex-wrap gap-4">
            {investments.map((investment, index) =>
                <Investment accessToken={accessToken} key={index} investmentModel={investment} id={index}/>
            )}
            {investments.length % 2 == 1 ? <div className="basis-1/3 flex-grow min-w-80"/> : ""}
        </div>
    </div>;
}
