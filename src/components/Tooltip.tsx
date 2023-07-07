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
      className="absolute ml-4 bg-black rounded-md p-2 text-xs"
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
