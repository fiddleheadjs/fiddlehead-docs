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
    let [renderPhase, setRenderPhase] = useState(1);

    useEffect(() => {
        if (renderPhase < 3) {
            setRenderPhase(value => value + 1);
        }
    }, [renderPhase]);

    return (
        <div class="AiMBA">
            <TopBar />
            <main role="main">
                <Banner />
                {renderPhase > 1 && (
                    <EcoSystem />
                )}
                {renderPhase > 2 && (
                    <>
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
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};
