import './AiMba.less';
import {Banner} from './banner/Banner';
import {TopBar} from './top-bar/TopBar';

export let AiMba = () => {
    return (
        <div class="AiMba">
            <TopBar />
            <Banner />
        </div>
    );
};
