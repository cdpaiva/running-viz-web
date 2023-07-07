import { useState } from "react";
import { dataValue } from "../utils/getHeatMapData";
import Renderer from "./Renderer";
import Tooltip from "./Tooltip";

type HeatmapProps = {
  width: number;
  height: number;
  data: dataValue[];
};

export type InteractionData = {
  xPos: number;
  yPos: number;
  value: number;
};

function HeatMap({ width, height, data }: HeatmapProps) {
  if (data.length === 0) {
    return (
      <div className="bg-neutral-600 rounded-lg p-2 relative overflow-x-scroll">
        <p className="px-4 py-6">
          No data collected, add new runs/sync your account first
        </p>
      </div>
    );
  }

  const [hoveredCell, setHoveredCell] = useState<InteractionData | null>(null);

  return (
    <div className="bg-neutral-600 rounded-lg p-2 relative overflow-x-scroll">
      <Renderer
        width={width}
        height={height}
        data={data}
        setHoveredCell={setHoveredCell}
      />
      <Tooltip interactionData={hoveredCell} />
    </div>
  );
}

export default HeatMap;
