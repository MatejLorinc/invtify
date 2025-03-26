"use client"

import {useEffect, useRef, useState} from "react";
import {LineChart} from "@/app/(app)/components/chart";
import * as d3 from "d3";
import {InvestmentDatetimeValueDto} from "@/app/models/investment/investment";
import {isoToDate} from "@/app/helpers/format";

export default function PortfolioChart({dataDto}: { dataDto: InvestmentDatetimeValueDto[] }) {
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

    const data = dataDto.map(dto => {
            return {
                value: dto.value,
                date: isoToDate(dto.datetime),
            }
        }
    );

    return <div className="h-48" ref={chartContainer}>
        <LineChart data={data}
                   width={width}
                   height={height}
                   marginTop={16}
                   marginRight={0}
                   marginBottom={17}
                   marginLeft={0}
                   areaColor="#f2fbf7"
                   lineColor="#00cc63"
                   areaExtra={(xProvider, yProvider, dArea, dLine) => {
                       const gradientId = `portfolioareagradient-investment`;

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