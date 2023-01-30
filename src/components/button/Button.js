import './Button.less';

export let Button = ({
    type = null,
    'class': className = '',
    children,
    variant = 'outlined',
    size = 'medium',
    ...rest
}) => {
    if (type === null) {
        type = rest.href != null ? 'link' : 'button';
    }

    let TagName = type === 'link' ? 'a' : 'button';

    return (
        <TagName
            class={`Button variant-${variant} size-${size}${className && ' ' + className}`}
            type={type}
            {...rest}
        >
            {children}
        </TagName>
    );
};
