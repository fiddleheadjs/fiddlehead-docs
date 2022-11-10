import './Button.less';

export let Button = ({
    'class': className = '',
    children,
    variant = 'outlined',
    size = 'medium',
    ...rest
}) => {
    return (
        <button
            class={`Button variant-${variant} size-${size}${className && ' ' + className}`}
            type="button"
            {...rest}
        >
            {children}
        </button>
    );
};
