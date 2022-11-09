export let createIcon = (children, viewBoxWidth, viewBoxHeight) => (({
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
        {children}
    </svg>
));
