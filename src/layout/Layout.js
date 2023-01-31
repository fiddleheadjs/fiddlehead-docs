import './Layout.less';
import {useEffect, useRef, useState} from 'fiddlehead';
import {Nav} from './nav/Nav';
import {useDispatch} from '../modules/store';
import {Top} from './top/Top';
import {useLocation} from '../modules/router';
import {Main} from './main/Main';
import {Sidebar} from './sidebar/Sidebar';

export let Layout = ({children}) => {
    let location = useLocation();

    let topbarRef = useRef(null);

    let [showsNavOnNonDesktop, setShowsNavOnNonDesktop] = useState(false);

    let setLayoutScroll = useDispatch((value, data) => {
        data.layoutScroll = {
            scrollee: document.documentElement,
            scroller: window,
            topShift: topbarRef.current?.offsetHeight || 0
        };
    });

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
            <div class="topbar" ref={topbarRef}>
                <Top
                    toggleNav={() => setShowsNavOnNonDesktop(x => !x)}
                    navShown={showsNavOnNonDesktop}
                />
            </div>
            <div class="epic-container">
                <div class={`middle${showsNavOnNonDesktop ? ' shows-nav-on-non-desktop' : ''}`}>
                    <Nav hideNav={() => setShowsNavOnNonDesktop(false)} />
                    <Main key={location.key}>
                        {children}
                    </Main>
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};
