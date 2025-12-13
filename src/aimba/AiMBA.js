import './common.less';
import './AiMBA.less';
import {TopBar} from './top-bar';
import {Header} from './header';
import {StudySystem} from './study-system';
import {Resources} from './resources';
import {Modules} from './modules';
import {OurSolution} from './our-solution';
import {CoreValues} from './core-values';
import {Features} from './features';
import {LearningStrategy} from './learning-strategy';
import {TargetAudience} from './target-audience';
import {Enrollment} from './enrollment';
import {FrequentlyAskedQuestions} from './frequently-asked-questions';
import {Footer} from './footer';
import {BeingTrusted} from './being-trusted';

export let AiMBA = () => {
    return (
        <div class="AiMBA">
            <TopBar />
            <Header />
            <StudySystem />
            <Resources />
            <Modules />
            <OurSolution />
            <CoreValues />
            <Features />
            <LearningStrategy />
            <TargetAudience />
            <BeingTrusted />
            <Enrollment />
            <FrequentlyAskedQuestions />
            <Footer />
        </div>
    );
};
