"use client"

import {useEffect, useRef, useState} from "react";
import {LineChart} from "@/app/(app)/components/chart";

export default function PortfolioChart() {
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

    return <div className="h-48" ref={chartContainer}>
        <LineChart data={[
            {date: new Date(2024, 4, 27), value: 1},
            {date: new Date(2024, 4, 28), value: 1.1},
            {date: new Date(2024, 4, 29), value: 1.2},
            {date: new Date(2024, 4, 30), value: 1.3},
            {date: new Date(2024, 4, 31), value: 1.25},
            {date: new Date(2024, 5, 1), value: 1.35},
            {date: new Date(2024, 5, 2), value: 1.4},
            {date: new Date(2024, 5, 3), value: 1.6},
            {date: new Date(2024, 5, 4), value: 1.55},
            {date: new Date(2024, 5, 5), value: 1.7},
            {date: new Date(2024, 5, 6), value: 1.68},
            {date: new Date(2024, 5, 7), value: 1.75},
            {date: new Date(2024, 5, 8), value: 1.8},
            {date: new Date(2024, 5, 9), value: 1.9},
            {date: new Date(2024, 5, 10), value: 2}
        ]}
                   width={width}
                   height={height}
                   marginTop={16}
                   marginRight={0}
                   marginBottom={17}
                   marginLeft={0}
                   areaColor="#f2fbf7"
                   lineColor="#00cc63"
                   areaExtra={(xProvider, yProvider, dArea, dLine) => {
                       const ticks = yProvider.ticks(2);

                       return <>
                           {ticks.map(tick => (
                               <line
                                   key={tick}
                                   x1={0}
                                   x2={width}
                                   y1={yProvider(tick) + 16}
                                   y2={yProvider(tick) + 16}
                                   stroke="gray"
                                   strokeWidth={0.5}
                                   strokeDasharray="12 4"
                                   opacity={0.5}
                               />
                           ))}
                       </>
                   }}/>
    </div>;
}