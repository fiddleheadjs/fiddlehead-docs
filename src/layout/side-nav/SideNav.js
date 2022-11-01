import {navigate, useLocation} from '../../router';
import './SideNav.less';

export let SideNav = () => {
    let location = useLocation();

    return (
        <div class="SideNav">
            <ul>
                <li class={location.pathname === '/' ? 'active' : ''}>
                    <a onClick={() => navigate('/')}>Home</a>
                </li>
                <li class={location.pathname === '/about' ? 'active' : ''}>
                    <a onClick={() => navigate('/about')}>About</a>
                </li>
            </ul>
        </div>
    );
};
