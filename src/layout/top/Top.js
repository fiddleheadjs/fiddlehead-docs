import './Top.less';
import {__} from '../../modules/i18n';
import {Link} from '../../modules/router';

export let Top = ({toggleNav, navShown}) => {
    return (
        <div class="Top">
            <div class="inner">
                <Link class="logo" href="/">
                    <img 
                        src="/img/Fiddlehead_320x320.png" 
                        alt={__('Fiddlehead logo')}
                    />
                    <span>Fiddlehead</span>
                </Link>
                <button
                    class="nav-toggle"
                    type="button"
                    onClick={toggleNav}
                >
                    {navShown ? __('Hide Navigation') : __('Show Navigation')}
                </button>
            </div>
        </div>
    );
};
