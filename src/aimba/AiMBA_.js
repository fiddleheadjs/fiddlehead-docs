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
    let [phase, setPhase] = useState(1);

    useEffect(() => {
        if (phase < 5) {
            setPhase(phase + 1);
        }
    }, [phase]);

    return (
        <div class="AiMBA">
            <TopBar />
            <main role="main">
                <Banner />
                
                {phase > 1 && <EcoSystem />}
                
                {phase > 2 && <Resources />}
                {phase > 2 && <Modules />}
                
                {phase > 3 && <OurSolution />}
                {phase > 3 && <CoreValues />}
                {phase > 3 && <Features />}

                {phase > 4 && <LearningStrategy />}
                {phase > 4 && <TargetAudience />}
                {phase > 4 && <BeingTrusted />}
                {phase > 4 && <Enrollment />}
                {phase > 4 && <FrequentlyAskedQuestions />}
            </main>
            <Footer />
        </div>
    );
};
