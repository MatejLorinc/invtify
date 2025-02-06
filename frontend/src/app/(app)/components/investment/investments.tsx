import Investment from "@/app/(app)/components/investment/investment";
import {getInvestments} from "@/app/services/investment.service";

export const dynamic = "force-dynamic",
    revalidate = 0;

export default async function Investments({accessToken}: { accessToken: string }) {
    const investments = await getInvestments(accessToken);

    return <div className="flex flex-col gap-4">
        <h1 className="mx-auto text-lg font-semibold">Active Investments</h1>
        <div className="flex flex-wrap gap-4">
            {investments.map((investment, index) =>
                <Investment key={index} investmentModel={investment} id={index}/>
            )}
            {investments.length % 2 == 1 ? <div className="basis-1/3 flex-grow min-w-80"/> : ""}
        </div>
    </div>;
}
