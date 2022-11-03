import './SideNav.less';
import {navigate, useLocation, pathsEqual} from '../../modules/router';
import {navItems} from '../../contentMap';

let renderItems = (navItems, currentPath) => {
    return (
        <ul>
            {navItems.map(item => (
                <li key={item.path} class={pathsEqual(currentPath, item.path) ? 'active' : null}>
                    <a onClick={() => navigate(item.path)}>{item.label}</a>
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
