import { MouseEventHandler } from "react";

type ButtonProps = {
  border?: boolean;
  text: string;
  handler: MouseEventHandler;
};

function Button(props: ButtonProps) {
  const baseClasses =
    "rounded-lg border-transparent border-2 p-2 transition-colors  hover:text-neon-green focus:text-neon-green";

  const classes = props.border
    ? `${baseClasses} border-white hover:border-neon-green`
    : baseClasses;

  return (
    <button className={classes} onClick={props.handler}>
      {props.text}
    </button>
  );
}

export default Button;
