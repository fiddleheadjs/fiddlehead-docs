import './SideNav.less';
import {navigate, useLocation, pathsTest} from '../../modules/router';
import {navItems} from '../../routes';

let renderItems = (navItems, currentPath) => {
    return (
        <ul>
            {navItems.map(item => (
                <li
                    key={item.path}
                    class={pathsTest(currentPath, item.path) ? 'active' : null}
                >
                    <a
                        href={item.hasTarget ? item.path : null}
                        onClick={item.hasTarget ? (event) => {
                            event.preventDefault();
                            navigate(item.path);
                        } : null}
                    >
                        {item.label}
                    </a>
                    {item.children.length > 0 && (
                        renderItems(item.children, currentPath)
                    )}
                </li>
            ))}
        </ul>
    );
};

export let SideNav = () => {
    let location = useLocation();

    return (
        <div class="SideNav">
            {renderItems(navItems, location.pathname)}
        </div>
    );
};
