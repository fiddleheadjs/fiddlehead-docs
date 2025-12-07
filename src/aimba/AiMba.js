import './common.less';
import './AiMba.less';
import {Banner} from './banner';
import {StudySystem} from './study-system';
import {TopBar} from './top-bar';

export let AiMba = () => {
    return (
        <div class="AiMba">
            <TopBar />
            <Banner />
            <StudySystem />
        </div>
    );
};
