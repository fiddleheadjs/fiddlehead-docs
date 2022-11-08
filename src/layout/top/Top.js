import './Top.less';
import {__} from '../../modules/i18n';
import {Link} from '../../modules/router';
import {Button} from '../../components/button/Button';

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
                <Button
                    class="nav-toggle"
                    onClick={toggleNav}
                >
                    {navShown ? __('Hide Navigation') : __('Show Navigation')}
                </Button>
            </div>
        </div>
    );
};
