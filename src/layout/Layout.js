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

    let setLayoutScroll = useDispatch((value, data) => {
        data.layoutScroll.element = document.documentElement;
        data.layoutScroll.object = window;
    });

    useEffect(() => {
        setLayoutScroll();

        window.addEventListener('resize', setLayoutScroll);

        return () => {
            window.removeEventListener('resize', setLayoutScroll);
        };
    }, []);

    let [showsNavOnNonDesktop, setShowsNavOnNonDesktop] = useState(false);

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setShowsNavOnNonDesktop(false);
        }, 200);

        return () => clearTimeout(timeoutId);
    }, [location]);

    return (
        <div class="Layout">
            <Top
                toggleNav={() => setShowsNavOnNonDesktop(x => !x)}
                navShown={showsNavOnNonDesktop}
            />
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
