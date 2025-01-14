"use client"

import PortfolioChart from "@/app/(app)/(components)/portfolio-chart";
import {useState} from "react";

const timeframes = [
    {
        label: "Day"
    },
    {
        label: "Week"
    },
    {
        label: "Month"
    },
    {
        label: "Year"
    },
    {
        label: "Max"
    }
]

export default function Portfolio() {
    const [activeTimeframe, setActiveTimeframe] = useState(timeframes[timeframes.length - 1]);

    return <div className="bg-gradient-to-t from-primary-400/25 rounded overflow-hidden shadow-lg">
        <div className="flex flex-col gap-0.5 px-6 py-4">
            <h2 className="text-sm text-gray-500">Current Balance</h2>
            <p className="text-xl font-medium">12 345,67 €</p>
            <p className="text-sm text-gray-500">+4845,67 € (+64,61%)</p>
        </div>
        <PortfolioChart/>
        <div className="bg-background-default">
            <div className="flex justify-evenly py-2 px-4">
                {timeframes.map((timeframe, index) => <TimeframeButton key={index}
                                                                       timeframe={timeframe.label}
                                                                       active={timeframes[index] === activeTimeframe}
                                                                       setActive={() => setActiveTimeframe(timeframes[index])}/>)}
            </div>
        </div>
        {/*<h2>Uninvested Balance</h2>*/}
        {/*<p>1 234,56 €</p>*/}
        {/*<h2>Total Balance</h2>*/}
        {/*<p>13 580,23 €</p>*/}
    </div>;
}

function TimeframeButton({timeframe, setActive, active = false}: { timeframe: string, setActive: () => void, active?: boolean }) {
    return <button className={`py-1 px-3 ${active ? "bg-black/90 text-white" : "bg-black/5 hover:bg-black/15"} rounded-full transition`} onClick={setActive}>
        <p className="text-center text-sm font-medium">{timeframe}</p>
    </button>;
}
