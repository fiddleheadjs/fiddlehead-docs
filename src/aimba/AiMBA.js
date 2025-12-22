import './AiMBA.less';
import {TopBar} from './top-bar';
import {Banner} from './banner';
import {EcoSystem} from './eco-system';
import {Resources} from './resources';
import {Modules} from './modules';
import {OurSolution} from './our-solution';
import {CoreValues} from './core-values';
import {Features} from './features';
import {LearningStrategy} from './learning-strategy';
import {TargetAudience} from './target-audience';
import {Registration} from './registration';
import {FrequentlyAskedQuestions} from './frequently-asked-questions';
import {Footer} from './footer';
import {BeingTrusted} from './being-trusted';
import {useEffect, useState} from 'fiddlehead';
import {FloatingActionButtons} from './floating-action-buttons';

export let AiMBA = (props) => {
    let [phase, setPhase] = useState(3);

    useEffect(() => {
        if (phase < 3) {
            setPhase(phase + 1);
        }
    }, [phase]);

    return (
        <div class="AiMBA">
            <TopBar {...props} />
            <main role="main">
                <Banner {...props} />
                
                {phase > 1 && <EcoSystem {...props} />}
                {phase > 1 && <Resources {...props} />}
                {phase > 1 && <Modules {...props} />}
                {phase > 1 && <OurSolution {...props} />}
                {phase > 1 && <CoreValues {...props} />}

                {phase > 2 && <Features {...props} />}
                {phase > 2 && <LearningStrategy {...props} />}
                {phase > 2 && <TargetAudience {...props} />}
                {phase > 2 && <BeingTrusted {...props} />}
                {phase > 2 && <Registration {...props} />}
                {phase > 2 && <FrequentlyAskedQuestions {...props} />}
            </main>
            <Footer {...props} />
            <FloatingActionButtons />
        </div>
    );
};
