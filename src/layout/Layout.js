import './Layout.less';
import {useEffect, useState} from 'fiddlehead';
import {Nav} from './nav/Nav';
import {useDispatch} from '../modules/store';
import {Top} from './top/Top';
import {useLocation} from '../modules/router';
import {Main} from './main/Main';
import {Sidebar} from './sidebar/Sidebar';

export let Layout = ({children}) => {
    let location = useLocation();

    let [showsNavOnNonDesktop, setShowsNavOnNonDesktop] = useState(false);

    let setLayoutScroll = useDispatch((value, data) => {
        data.layoutScroll.element = document.documentElement;
        data.layoutScroll.object = window;
    });

    useEffect(() => {

    }, [location]);

    useEffect(() => {
        setLayoutScroll();

        let listenOptions = {passive: true};

        window.addEventListener('resize', setLayoutScroll, listenOptions);

        return () => {
            window.removeEventListener('resize', setLayoutScroll, listenOptions);
        };
    }, []);

    return (
        <div class="Layout">
            <div class="topbar">
                <Top
                    toggleNav={() => setShowsNavOnNonDesktop(x => !x)}
                    navShown={showsNavOnNonDesktop}
                />
            </div>
            <div class="epic-container">
                <div class={`middle${showsNavOnNonDesktop ? ' shows-nav-on-non-desktop' : ''}`}>
                    <Nav />
                    <Main key={location.key}>
                        {children}
                    </Main>
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};
