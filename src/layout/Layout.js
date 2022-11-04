import './Layout.less';
import {useEffect, useState} from 'fiddlehead';
import {Nav} from './nav/Nav';
import {useDispatch} from '../modules/store';
import {Top} from './top/Top';
import {useLocation} from '../modules/router';

export let Layout = ({children}) => {
    let location = useLocation();

    let setLayoutScrollElement = useDispatch((data) => {
        data.layoutScrollElement = document.documentElement;
        data.layoutScrollObject = window;
    });

    useEffect(() => {
        setLayoutScrollElement();
    }, []);

    let [showsNavOnNonDesktop, setShowsNavOnNonDesktop] = useState(false);

    return (
        <div class="Layout">
                <Top
                    toggleNav={() => setShowsNavOnNonDesktop(x => !x)}
                    navShown={showsNavOnNonDesktop}
                />
            <div class="inner">
                <div
                    class={[
                        'middle',
                        showsNavOnNonDesktop && 'shows-nav-on-non-desktop',
                    ].filter(Boolean).join(' ')}
                >
                    <Nav/>
                    <main key={location.key}>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};
