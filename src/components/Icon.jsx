export default function Icon({ name, size = 24, color = "black" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 24 24"
    >
      <path d={icon[name]} />
    </svg>
  );
}
const icon = {
  "arrow-up": "M12 16.75a.75.75 0 0 0 .75-.75v-4.5h4.5a.75.75 0 0 0 .75-.75l2.25-2.25a.75.75 0 0 0 0-1.06L18 5.25a.75.75 0 0 0-1.06 0L15 7.5V12a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 .75-.75z",
};
