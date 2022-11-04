import './Top.less';
import {__} from '../../modules/i18n';
import {navigate} from '../../modules/router';

export let Top = ({toggleNav, navShown}) => {
    return (
        <div class="Top">
            <div class="inner">
                <a
                    class="logo"
                    href="/"
                    onClick={() => navigate('/')}
                >
                    <img src="/img/Fiddlehead_320x320.png"/>
                    <span>Fiddlehead</span>
                </a>
                <button
                    class="nav-toggle"
                    type="button"
                    onClick={toggleNav}
                >
                    {navShown ? 'Hide Navigation' : 'Show Navigation'}
                </button>
            </div>
        </div>
    );
};
