import './Top.less';
import {__} from '../../modules/i18n';
import {Link} from '../../modules/router';
import {Button} from '../../components/button/Button';
import {GithubIcon} from '../../icons/GithubIcon';
import {HamburgerIcon} from '../../icons/HamburgerIcon';

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
                    <Button
                        class="github"
                        href="https://github.com/fiddleheadjs/fiddlehead"
                        title="Fiddlehead repository on GitHub"
                        target="_blank"
                        variant="textual"
                    >
                        <GithubIcon size="1.6em" />
                    </Button>
                    <Button
                        class={`nav-toggle${navShown ? ' active' : ''}`}
                        onClick={toggleNav}
                    >
                        <HamburgerIcon />
                        <span>{__('Menu')}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};
