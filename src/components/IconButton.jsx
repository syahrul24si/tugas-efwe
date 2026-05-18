import Button from "./Button";

export default function IconButton({
  icon,
  variant = "primary",
  size = 32,
  title,
  onClick,
  ...props
}) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      title={title}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    >
      {icon}
    </Button>
  );
}