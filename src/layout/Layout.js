import './Layout.less';
import {SideNav} from './side-nav/SideNav';
import {MainContent} from './main-content/MainContent';

export let Layout = ({children}) => {
    return (
        <div class="Layout">
            <SideNav/>
            <MainContent>
                {children}
            </MainContent>
        </div>
    );
};
