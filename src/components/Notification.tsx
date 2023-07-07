type NotificationProps = {
  text: string;
  handleClose: () => void;
  variant: "info" | "danger";
};

const Notification = (props: NotificationProps) => {
  const baseClasses = "text-white px-4 py-2 m-2 rounded-md flex items-center";

  const classes =
    props.variant === "info"
      ? `${baseClasses} bg-blue-500`
      : `${baseClasses} bg-red-500`;

  return (
    <div className={classes}>
      <span className="font-medium">{props.text}</span>
      <button className="ml-auto" onClick={props.handleClose}>
        X
      </button>
    </div>
  );
};

export default Notification;
