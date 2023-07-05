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
  const [hoveredCell, setHoveredCell] = useState<InteractionData | null>(null);

  return (
    <div className="heat-map">
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
