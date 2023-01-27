export let createIcon = (pathData, viewBoxWidth, viewBoxHeight) => (({
    size = '1em',
    color = 'currentColor',
}) => (
    <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        style={{
            fontSize: 'inherit',
            minWidth: size,
            maxWidth: size,
            minHeight: size,
            maxHeight: size,
            fill: color,
        }}
    >
        <path d={pathData} />
    </svg>
));
