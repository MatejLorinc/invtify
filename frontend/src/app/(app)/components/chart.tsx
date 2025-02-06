import {ReactElement, useCallback, useRef, useState} from "react";
import * as d3 from "d3";
import {formatCurrency, formatDate} from "@/app/helpers/format";

type DataEntry = { date: Date, value: number };

export function LineChart({
                              data,
                              width,
                              height,
                              marginTop,
                              marginRight,
                              marginBottom,
                              marginLeft,
                              areaColor,
                              lineColor,
                              areaExtra
                          }: {
    data: DataEntry[]
    width: number
    height: number
    marginTop: number
    marginRight: number
    marginBottom: number
    marginLeft: number
    areaColor: string
    lineColor: string
    areaExtra?: (xProvider: d3.ScaleTime<number, number>, yProvider: d3.ScaleLinear<number, number>, dArea: string, dLine: string) => ReactElement
}) {
    const tooltipRef = useRef(null);
    const tooltipDotRef = useRef(null);

    const [tooltipDate, setTooltipDate] = useState(new Date());
    const [tooltipValue, setTooltipValue] = useState(0);

    const bisect = d3.bisector((d: DataEntry) => d.date).center;

    let dataAsXYArray: [number, number][] = data.map(d => [d.date.getTime(), d.value]);

    const xProvider = d3.scaleUtc(d3.extent(data, d => d.date) as Iterable<d3.NumberValue>, [marginLeft, width - marginRight]);
    const yProvider = d3.scaleLinear(d3.extent(data, d => d.value) as Iterable<d3.NumberValue>, [height - marginBottom, marginTop]);
    // Declare the area generator.

    const area = d3.area()
        .x(d => xProvider(d[0]))
        .y0(yProvider(0))
        .y1(d => yProvider(d[1]));

    const line = d3.line()
        .x(d => xProvider(d[0]))
        .y(d => yProvider(d[1]));

    const onPointerMove = useCallback((event: any) => {
        const margin = 16;

        const tooltip: d3.Selection<any, unknown, null, undefined> = d3.select(tooltipRef.current);
        const tooltipDot: d3.Selection<any, unknown, null, undefined> = d3.select(tooltipDotRef.current);
        const i = bisect(data, xProvider.invert(d3.pointer(event)[0]));

        setTooltipDate(data[i].date)
        setTooltipValue(data[i].value)

        const left = xProvider(data[i].date);
        const top = yProvider(data[i].value);

        tooltipDot.style("opacity", 1);
        tooltipDot.style("left", `${left - tooltipDot.node().getBoundingClientRect().width / 2}px`)
        tooltipDot.style("top", `${top - tooltipDot.node().getBoundingClientRect().height / 2}px`)

        const tooltipClientRect = tooltip.node().getBoundingClientRect();
        const parentClientRect = tooltip.node().parentElement.getBoundingClientRect();
        const halfTooltipHeight = tooltipClientRect.height / 2;

        let tooltipLeft = left + margin;
        let tooltipTop = top;

        if (tooltipClientRect.width + tooltipLeft > parentClientRect.width) {
            tooltipLeft = left - tooltipClientRect.width - margin
            tooltip.classed("tooltip-left", true)
            tooltip.classed("tooltip-right", false)
        } else {
            tooltip.classed("tooltip-left", false)
            tooltip.classed("tooltip-right", true)
        }

        if (halfTooltipHeight + tooltipTop > parentClientRect.height) {
            tooltipTop -= halfTooltipHeight + margin / 2
            tooltip.classed("tooltip-left", false)
            tooltip.classed("tooltip-right", false)
        }

        tooltip.style("opacity", 1);
        tooltip.style("left", `${tooltipLeft}px`)
        tooltip.style("top", `${tooltipTop - halfTooltipHeight}px`)
    }, [bisect, data, xProvider, yProvider]);

    const onPointerLeave = useCallback(() => {
        const tooltip = d3.select(tooltipRef.current);
        const tooltipDot = d3.select(tooltipDotRef.current);
        tooltip.style("opacity", 0);
        tooltipDot.style("opacity", 0);
    }, []);

    const dArea = area(dataAsXYArray);
    const dLine = line(dataAsXYArray);
    if (dArea == null || dLine == null) return <div/>;

    return <div className="relative"
                onPointerEnter={onPointerMove}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}>
        <div ref={tooltipRef}
             className="absolute z-10 min-w-max inline-block px-3 py-2 text-white bg-black/75 rounded shadow-sm text-left transition"
             style={{opacity: 0}}>
            <p className="text-sm">{formatDate(tooltipDate)}</p>
            <p className="text-sm font-medium"><span className="text-primary-400">•</span> {formatCurrency(tooltipValue)}</p>
        </div>
        <div ref={tooltipDotRef}
             className="absolute z-10 inline-block rounded-full p-1 bg-primary-400 border-4 border-primary-400/25 bg-clip-padding transition"
             style={{opacity: 0}}>
        </div>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <path fill={areaColor} d={dArea}/>
            <path fill="none" stroke={lineColor} strokeWidth="1.5" d={dLine}/>
            {areaExtra && areaExtra(xProvider, yProvider, dArea, dLine)}
        </svg>
    </div>
}