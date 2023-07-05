import { InteractionData } from "./HeatMap";

type TooltipProps = {
  interactionData: InteractionData | null;
};

const Tooltip = ({ interactionData }: TooltipProps) => {
  if (!interactionData) {
    return null;
  }

  const text = `Distance: ${(interactionData.value / 1000).toFixed(2)} km`;

  return (
    <div
      className="tooltip"
      style={{
        left: interactionData.xPos,
        top: interactionData.yPos,
      }}
    >
      <p>{text}</p>
    </div>
  );
};

export default Tooltip;
