import './Section.less';
import {useState} from 'fiddlehead';

export let Section = ({
    icon,
    title,
    actions,
    children,
    defaultOpen = null,
    usesCssToClose = false,
    class: className,
    ...otherProps
}) => {
    let touchable = defaultOpen !== null;
    let [open, setOpen] = useState(touchable ? defaultOpen : true);

    return (
        <div
            class={`Section${className != null ? ` ${className}` : ''}${open ? ' open' : ''}`}
            {...otherProps}
        >
            <div
                class={`heading${touchable ? ' touchable' : ''}`}
                onClick={touchable ? () => setOpen(open => !open) : null}
            >
                <div class="title">
                    {icon}
                    <span>{title}</span>
                </div>
                {
                    actions != null &&
                    <div class="actions">
                        {actions}
                    </div>
                }
            </div>
            {
                (open || usesCssToClose) &&
                <div
                    class="body"
                    style={{display: open ? null : 'none'}}
                >
                    {children}
                </div>
            }
        </div>
    );
};
