export const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;

  // Parse the date string (e.g., "Mar 20")
  const dateParts = payload.value.split(' ');
  const month = dateParts[0]; // "Mar"
  const day = dateParts[1]; // "20"

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
