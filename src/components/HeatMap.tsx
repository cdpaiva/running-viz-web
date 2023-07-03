import * as d3 from "d3";
import { useMemo } from "react";
import { dataValue } from "../utils/getHeatMapData";

type HeatmapProps = {
  width: number;
  height: number;
  data: dataValue[];
};

const MARGIN = { top: 10, right: 10, bottom: 20, left: 30 };

function HeatMap({ width, height, data }: HeatmapProps) {
  // bounds = area inside the axis
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  // List of unique items that will appear on the heatmap Y axis
  // const allYGroups = useMemo(
  //   () => [...new Set(data.map((d) => d.y))].sort(),
  //   [data]
  // );
  const allYGroups = ["0", "1", "2", "3", "4", "5", "6"];
  const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .padding(0.1);
  }, [data, width]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.1);
  }, [data, height]);

  const [min, max] = d3.extent<number>(data.map((d) => d.value || 0));

  if (min === undefined || max === undefined) {
    return null;
  }

  // interpolate values: https://github.com/d3/d3-scale-chromatic/blob/main/README.md#diverging
  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolate("#1e1e1e", "#00FF87"))
    // .interpolator(d3.interpolateYlGn)
    .domain([min, max]);

  const allRects = data.map((d, i) => {
    if (d.value === null) {
      return;
    }
    return (
      <rect
        rx={1}
        ry={1}
        key={i}
        x={xScale(d.x)}
        y={yScale(d.y)}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        fill={colorScale(d.value)}
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
    <div className="heat-map">
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
    </div>
  );
}

export default HeatMap;

/*

  Domain of the scale of time, with an array containing the beginning and the end of the time scale

*/
