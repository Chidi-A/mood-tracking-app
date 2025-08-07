interface CustomXAxisTickProps {
  x: number;
  y: number;
  payload?: {
    value: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export const CustomXAxisTick = (props: CustomXAxisTickProps) => {
  const { x, y, payload } = props;

  let month, day;

  // Check if the value is a timestamp or already formatted date
  if (payload?.value?.includes('T')) {
    // It's a timestamp, format it
    const date = new Date(payload.value);
    const formatted = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    const dateParts = formatted.split(' ');
    month = dateParts[0]; // "Aug"
    day = dateParts[1]; // "7"
  } else {
    // It's already a formatted date string (e.g., "Mar 20")
    const dateParts = payload?.value?.split(' ');
    month = dateParts?.[0]; // "Mar"
    day = dateParts?.[1]; // "20"
  }

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Month - top line */}
      <text
        x={0}
        dy={10}
        textAnchor="middle"
        fill="#21214d" // neutral-900
        fontSize="12px" // text-preset-9
        fontFamily="Reddit Sans, sans-serif"
        opacity={0.7}
      >
        {month}
      </text>

      {/* Day - bottom line */}
      <text
        x={0}
        dy={28}
        textAnchor="middle"
        fill="#21214d" // neutral-900
        fontSize="14px" // text-preset-8
        fontFamily="Reddit Sans, sans-serif"
        opacity={1}
      >
        {day}
      </text>
    </g>
  );
};
