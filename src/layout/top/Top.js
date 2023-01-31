import './Top.less';
import {__} from '../../modules/i18n';
import {LinkButton} from '../../modules/router';
import {Button} from '../../components/button/Button';
import {GithubIcon} from '../../icons/GithubIcon';
import {ChevronRightIcon} from '../../icons/ChevronRightIcon';
import {ChevronLeftIcon} from '../../icons/ChevronLeftIcon';

export let Top = ({toggleNav, navShown}) => {
    return (
        <div class="Top">
            <LinkButton
                class="logo"
                variant="textual"
                href="/"
            >
                <img 
                    src="/img/fiddlehead_64.png"
                    alt={__('Fiddlehead logo')}
                />
                <span>Fiddlehead</span>
            </LinkButton>
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
                    class="nav-toggle"
                    onClick={toggleNav}
                >
                    <span>{__('Menu')}</span>
                    {navShown ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </Button>
            </div>
        </div>
    );
};
