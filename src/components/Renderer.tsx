import * as d3 from "d3";
import { useMemo } from "react";
import { dataValue } from "../utils/getHeatMapData";
import { InteractionData } from "./HeatMap";

type HeatmapProps = {
  width: number;
  height: number;
  data: dataValue[];
  setHoveredCell: (hoveredCell: InteractionData | null) => void;
};

const MARGIN = { top: 10, right: 10, bottom: 20, left: 30 };

function Renderer({ width, height, data, setHoveredCell }: HeatmapProps) {
  // bounds = area inside the axis
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const allYGroups = ["0", "1", "2", "3", "4", "5", "6"];
  const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .padding(0.15);
  }, [data, width]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.15);
  }, [data, height]);

  const [min, max] = d3.extent<number>(data.map((d) => d.value || 0));

  if (min === undefined || max === undefined) {
    return null;
  }

  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolate("#1e1e1e", "#00FF87"))
    .domain([min, max]);

  const allRects = data.map((d, i) => {
    const x = xScale(d.x);
    const y = yScale(d.y);

    if (d.value === null || !x || !y) {
      return;
    }
    return (
      <rect
        rx={1}
        ry={1}
        key={i}
        x={x}
        y={y}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        fill={colorScale(d.value)}
        onMouseEnter={() => {
          setHoveredCell({
            xPos: x + xScale.bandwidth() + MARGIN.left,
            yPos: y + xScale.bandwidth() / 2 + MARGIN.top,
            value: d.value,
          });
        }}
        onMouseLeave={() => setHoveredCell(null)}
        cursor="pointer"
      />
    );
  });

  const xLabels = allXGroups.map((name, i) => {
    const xPos = xScale(name) ?? 0;
    return (
      <text
        key={i}
        x={xPos + xScale.bandwidth() / 2}
        y={boundsHeight + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
        fill="white"
      >
        {name}
      </text>
    );
  });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const yLabels = allYGroups.map((name, i) => {
    const yPos = yScale(name) ?? 0;
    return (
      <text
        key={i}
        x={-5}
        y={yPos + yScale.bandwidth() / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={10}
        fill="white"
      >
        {weekDays[parseInt(name)]}
      </text>
    );
  });

  return (
    <svg width={width} height={height}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      >
        {allRects}
        {xLabels}
        {yLabels}
      </g>
    </svg>
  );
}

export default Renderer;
