import './Nav.less';
import {useLocation, pathsTest, pathsEqual, Link} from '../../modules/router';
import {navItems} from '../../routes';

export let Nav = ({hideNav}) => {
    let location = useLocation();

    let handleLinkClick = () => {
        setTimeout(hideNav, 200);
    };

    let renderList = (navItems) => (
        <ul>
            {navItems.map(item => {
                let active = pathsEqual(location.pathname, item.path);
                let selected = pathsTest(location.pathname, item.path);

                return (
                    <li key={item.path}>
                        <Link
                            href={item.hasTarget ? item.path : null}
                            class={`${active ? 'active' : ''}${selected ? ' selected' : ''}`}
                            onClick={handleLinkClick}
                        >
                            {item.label}
                        </Link>
                        {item.children.length > 0 && (
                            renderList(item.children)
                        )}
                    </li>
                );
            })}
        </ul>
    );
    
    return (
        <div class="Nav">
            {renderList(navItems)}
        </div>
    );
};
