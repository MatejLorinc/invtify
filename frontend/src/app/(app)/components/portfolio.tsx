"use client"

import PortfolioChart from "@/app/(app)/components/portfolio-chart";
import {useEffect, useState} from "react";
import {getPortfolio} from "@/app/services/portfolio.service";
import {PortfolioTimeframe} from "@/app/models/portfolio/portfolio-timeframe";
import {formatCurrency, formatPercentage} from "@/app/helpers/format";

function PortfolioInfoComponent({title, value, additionalValue}: { title: string, value: string, additionalValue: string }) {
    return <div className="flex w-48 rounded p-2 px-4 flex-col gap-0.5 text-center">
        <h2 className="text-sm text-gray-500">{title}</h2>
        <p className="text-xl font-medium">{value}</p>
        <p className="text-sm">{additionalValue}</p>
    </div>;
}

export default function Portfolio({accessToken, totalCash}: { accessToken: string, totalCash: number }) {
    const [activeTimeframe, setActiveTimeframe] = useState(PortfolioTimeframe.MAX);
    const [portfolio, setPortfolio] = useState<any | null>(null);

    useEffect(() => {
        async function fetchPortfolio() {
            const data = await getPortfolio(accessToken, activeTimeframe);
            setPortfolio(data);
        }

        fetchPortfolio();
    }, [accessToken, activeTimeframe]);


    if (!portfolio) {
        return <div className="bg-background-default rounded overflow-hidden shadow-lg">
            <div className="flex flex-wrap gap-2 justify-around">
                <PortfolioInfoComponent title="Current Balance" value={formatCurrency(0)}
                                        additionalValue={"Cash: " + formatCurrency(0)}/>
                <PortfolioInfoComponent title="Total Return" value={formatPercentage(0)}
                                        additionalValue={formatCurrency(0)}/>
                <PortfolioInfoComponent title={activeTimeframe.displayName + " Return"} value={formatPercentage(0)}
                                        additionalValue={formatCurrency(0)}/>
            </div>
        </div>;
    }

    return <div className="bg-background-default rounded overflow-hidden shadow-lg">
        <div className="flex flex-wrap gap-2 justify-around">
            <PortfolioInfoComponent title="Current Balance" value={formatCurrency(portfolio.currentValue)}
                                    additionalValue={"Cash: " + formatCurrency(totalCash)}/>
            <PortfolioInfoComponent title="Total Return" value={formatPercentage(portfolio.totalReturnPercentage)}
                                    additionalValue={formatCurrency(portfolio.totalReturn)}/>
            <PortfolioInfoComponent title={activeTimeframe.displayName + " Return"} value={formatPercentage(portfolio.totalReturnPercentage)}
                                    additionalValue={formatCurrency(portfolio.totalReturn)}/>
        </div>
        <PortfolioChart/>
        <div className="bg-background-default">
            <div className="flex justify-evenly py-2 px-4">
                {PortfolioTimeframe.getValues().map((timeframe, index) => <TimeframeButton key={index}
                                                                                           timeframe={timeframe.displayName}
                                                                                           active={timeframe === activeTimeframe}
                                                                                           setActive={() => setActiveTimeframe(timeframe)}/>)}
            </div>
        </div>
    </div>;
}

function TimeframeButton({timeframe, setActive, active = false}: { timeframe: string, setActive: () => void, active?: boolean }) {
    return <button className={`py-1 px-3 ${active ? "bg-black/90 text-white" : "bg-black/5 hover:bg-black/15"} rounded-full transition`} onClick={setActive}>
        <p className="text-center text-sm font-medium">{timeframe}</p>
    </button>;
}
