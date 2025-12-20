import './common.less';
import './AiMBA_.less';
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
import {Enrollment} from './enrollment';
import {FrequentlyAskedQuestions} from './frequently-asked-questions';
import {Footer} from './footer';
import {BeingTrusted} from './being-trusted';
import {useEffect, useState} from 'fiddlehead';

export let AiMBA = () => {
    let [phase, setPhase] = useState(3);

    useEffect(() => {
        if (phase < 3) {
            setPhase(phase + 1);
        }
    }, [phase]);

    return (
        <div class="AiMBA">
            <TopBar />
            <main role="main">
                <Banner />
                
                {phase > 1 && <EcoSystem />}
                {phase > 1 && <Resources />}
                {phase > 1 && <Modules />}
                {phase > 1 && <OurSolution />}
                {phase > 1 && <CoreValues />}

                {phase > 2 && <Features />}
                {phase > 2 && <LearningStrategy />}
                {phase > 2 && <TargetAudience />}
                {phase > 2 && <BeingTrusted />}
                {phase > 2 && <Enrollment />}
                {phase > 2 && <FrequentlyAskedQuestions />}
            </main>
            <Footer />
        </div>
    );
};
