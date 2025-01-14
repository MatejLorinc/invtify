import {FaPlus} from "react-icons/fa6";
import Investment from "@/app/(app)/(components)/investment";
import {getInvestments} from "@/app/(services)/investment.service";

export const dynamic = "force-dynamic",
    revalidate = 0;

export default async function Investments({accessToken}: { accessToken: string }) {
    // TODO: Get investment data
    const investments = await getInvestments(accessToken);

    return <div className="flex flex-col gap-4">
        <h1 className="mx-auto text-lg font-semibold">Active Investments</h1>
        <div className="flex flex-wrap gap-4">
            {investments.map((investment, index) =>
                <Investment key={index} investmentModel={investment} id={index}/>
            )}
            <AddInvestmentComponent/>
        </div>
    </div>;
}

function AddInvestmentComponent() {
    return <div
        className="flex basis-1/3 flex-grow min-w-80 items-center rounded overflow-hidden shadow-lg bg-secondary-900 transition duration-300 hover:bg-secondary-700 cursor-pointer">
        {/*TODO: On click add new investment*/}
        <div className="p-4 border-r">
            <FaPlus size="2rem"/>
        </div>
        <h2 className="p-4 font-medium text-center">Add New Investment</h2>
    </div>;
}
