"use client"

import {useEffect, useRef, useState} from "react";
import {DataEntry, LineChart} from "@/app/(app)/components/chart";
import * as d3 from "d3";

export default function InvestmentChart({id, data}: { id: number, data: DataEntry[] }) {
    const chartContainer = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => setWidth(entry.contentRect.width));
            entries.forEach((entry) => setHeight(entry.contentRect.height));
        });
        if (chartContainer.current != null) {
            resizeObserver.observe(chartContainer.current);
        }
        return () => resizeObserver.disconnect();
    }, []);

    return <div className="basis-0 flex-grow" ref={chartContainer}>
        <LineChart data={data}
                   width={width}
                   height={height}
                   marginTop={8}
                   marginRight={0}
                   marginBottom={0}
                   marginLeft={8}
                   areaColor="#f2fbf7"
                   lineColor="#00cc63"
                   areaExtra={(xProvider, yProvider, dArea, dLine) => {
                       const gradientId = `chartareagradient-investment-${id}`;

                       const color = "#00cc63";
                       const stops = [
                           {offset: '0%', color: `${color}00`},
                           {offset: '100%', color: `${color}55`}
                       ];

                       return <>
                           <defs>
                               <linearGradient id={gradientId} x1="0" x2="0" y1={yProvider(d3.min(data, d => d.value) as number)}
                                               y2={yProvider(d3.max(data, d => d.value) as number) - 100}
                                               gradientUnits="userSpaceOnUse">
                                   {stops.map((stop, index) => (
                                       <stop key={index} offset={stop.offset} stopColor={stop.color}/>
                                   ))}
                               </linearGradient>
                           </defs>
                           <path fill={`url(#${gradientId})`} d={dArea}/>
                       </>
                   }}/>
    </div>;
}