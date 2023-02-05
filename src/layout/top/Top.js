import './Top.less';
import {__} from '../../modules/i18n';
import {Link} from '../../modules/router';
import {Button} from '../../components/button/Button';
import {GithubIcon} from '../../icons/GithubIcon';
import {ChevronRightIcon} from '../../icons/ChevronRightIcon';
import {ChevronLeftIcon} from '../../icons/ChevronLeftIcon';
import {LogoIcon} from '../logo/LogoIcon';
import {LogoText} from '../logo/LogoText';

export let Top = ({toggleNav, navShown}) => {
    return (
        <div class="Top">
            <Link
                class="logo"
                href="/"
            >
                <LogoIcon />
                <LogoText />
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
