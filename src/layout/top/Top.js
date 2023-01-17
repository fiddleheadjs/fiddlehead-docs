import './Top.less';
import {__} from '../../modules/i18n';
import {Link} from '../../modules/router';
import {Button} from '../../components/button/Button';
import {GithubIcon} from '../../icons/GithubIcon';

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
                <div class="right">
                    <a
                        class="github"
                        href="https://github.com/fiddleheadjs/fiddlehead"
                        title="Fiddlehead repository on GitHub"
                        target="_blank"
                    >
                        <GithubIcon size="1.7em"/>
                    </a>
                    <Button
                        class="nav-toggle"
                        onClick={toggleNav}
                        size="small"
                    >
                        {navShown ? __('Hide Navigation') : __('Show Navigation')}
                    </Button>
                </div>
            </div>
        </div>
    );
};
