import './Nav.less';
import {navigate, useLocation, pathsTest, pathsEqual} from '../../modules/router';
import {navItems} from '../../routes';

export let Nav = () => {
    let location = useLocation();
    
    return (
        <nav class="Nav">
            {renderItems(navItems, location.pathname)}
        </nav>
    );
};

let renderItems = (navItems, currentPath) => {
    return (
        <ul>
            {navItems.map(item => (
                <li key={item.path}>
                    <a
                        href={item.hasTarget ? item.path : null}
                        onClick={item.hasTarget ? (event) => {
                            event.preventDefault();
                            navigate(item.path);
                        } : null}
                        class={[
                            pathsEqual(currentPath, item.path) && 'active',
                            pathsTest(currentPath, item.path) && 'selected',
                        ].filter(Boolean).join(' ')}
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
