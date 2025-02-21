import {ReactElement} from "react";

export function InvestmentInfoComponent({header, info, icon}: { header: string, info: string, icon: ReactElement }) {
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