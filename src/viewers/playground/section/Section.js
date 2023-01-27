import {useState} from 'fiddlehead';
import './Section.less';

export let Section = ({
    icon,
    title,
    actions,
    children,
    defaultOpen = null,
    usesCssToCollapse = false,
    class: className,
    ...otherProps
}) => {
    let collapsible = defaultOpen !== null;
    let [open, setOpen] = useState(collapsible ? defaultOpen : true);

    let toggle = () => {
        if (collapsible) {
            setOpen(open => !open);
        }
    };

    return (
        <div
            class={`Section ${className}`}
            {...otherProps}
        >
            <div
                class={`heading${collapsible ? ' touchable' : ''}`}
                onClick={toggle}
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
                (open || usesCssToCollapse) &&
                <div
                    class="body"
                    style={{display: !open ? 'none' : null}}
                >
                    {children}
                </div>
            }
        </div>
    );
};
