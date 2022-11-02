import './SideNav.less';
import {navigate, useLocation} from '../../router';
import {routes} from '../../routes';

export let SideNav = () => {
    let location = useLocation();

    return (
        <div class="SideNav">
            <ul>
                {routes.filter(t => t.label != null).map(t => (
                    <li key={t.path} class={location.pathname === t.path ? 'active' : ''}>
                        <a onClick={() => navigate(t.path)}>{t.label}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
