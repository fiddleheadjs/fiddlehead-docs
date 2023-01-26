import './Spinner.less';

export let Spinner = ({color = 'currentColor', size = '1em'}) => {
    return (
        <svg
            class="Spinner"
            viewBox="0 0 132 132"
            width={size}
            height={size}
        >
            <circle
                fill="none"
                stroke={color}
                stroke-width="18"
                stroke-line-cap="round"
                cx="66"
                cy="66"
                r="57"
            />
        </svg>
    );
};
