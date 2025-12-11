import './common.less';
import './AiMba.less';
import {Banner} from './banner';
import {StudySystem} from './study-system';
import {TopBar} from './top-bar';
import {Resources} from './resources';
import {Modules} from './modules';
import {OurSolution} from './our-solution';
import {CoreValues} from './core-values';
import {Features} from './features';
import {LearningStrategy} from './learning-strategy';
import {TargetAudience} from './target-audience';

export let AiMba = () => {
    return (
        <div class="AiMba">
            <TopBar />
            <Banner />
            <StudySystem />
            <Resources />
            <Modules />
            <OurSolution />
            <CoreValues />
            <Features />
            <LearningStrategy />
            <TargetAudience />
        </div>
    );
};
