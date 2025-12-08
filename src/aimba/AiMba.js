import './common.less';
import './AiMba.less';
import {Banner} from './banner';
import {StudySystem} from './study-system';
import {TopBar} from './top-bar';
import {Resources} from './resources';
import {Modules as M} from './modules';

export let AiMba = () => {
    return (
        <div class="AiMba">
            <TopBar />
            <Banner />
            <StudySystem />
            <Resources />
            <M />
        </div>
    );
};
