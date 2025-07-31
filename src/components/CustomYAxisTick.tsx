interface CustomYAxisTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: number;
  };
  [key: string]: unknown;
}

export const CustomYAxisTick = (props: CustomYAxisTickProps) => {
  const { x, y, payload } = props;

  const formatYAxisTick = (value: number) => {
    if (value === 0) return '';
    if (value <= 2) return '0-2 hours';
    if (value <= 4) return '3-4 hours';
    if (value <= 6) return '5-6 hours';
    if (value <= 8) return '7-8 hours';
    return '9+ hours';
  };

  const label = formatYAxisTick(payload?.value || 0);

  if (!label) return null;

  return (
    <g transform={`translate(${x},${y})`}>
      <image
        x={-85}
        y={-6}
        width={10}
        height={10}
        href="/src/assets/images/sleep-bar-icon.svg"
        aria-label="sleep icon"
      />

      <text
        x={-20}
        dy={4}
        textAnchor="end"
        fill="#57577b"
        fontSize="12px"
        fontFamily="Reddit Sans, sans-serif"
      >
        {label}
      </text>
    </g>
  );
};
