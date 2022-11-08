import './Button.less';

export let Button = ({'class': className = '', children, ...rest}) => {
    return (
        <button
            class={`Button${className && ' ' + className}`}
            type="button"
            {...rest}
        >
            {children}
        </button>
    );
};
