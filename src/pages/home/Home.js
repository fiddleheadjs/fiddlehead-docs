import './Home.less';
import {Demo} from './demo/Demo';
import {Intro} from './intro/Intro';

export let Home = () => {
    return (
        <div className="Home">
            <h1>Fiddlehead</h1>
            <Intro/>
            <Demo/>
        </div>
    );
};
