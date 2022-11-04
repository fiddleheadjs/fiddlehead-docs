import './Layout.less';
import {useEffect} from 'fiddlehead';
import {Nav} from './nav/Nav';
import {useDispatch} from '../modules/store';

export let Layout = ({children}) => {
    let setLayoutScrollElement = useDispatch((data) => {
        data.layoutScrollElement = document.documentElement;
        data.layoutScrollObject = window;
    });

    useEffect(() => {
        setLayoutScrollElement();
    }, []);

    return (
        <div class="Layout">
            <div class="inner">
                <Nav/>
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
};
