import './Home.less';
import {Demo} from './demo/Demo';
import {Intro} from './intro/Intro';
import {CodeViewer} from '../../viewers/code/CodeViewer';

export let Home = () => {
    return (
        <div class="Home">
            <h1>Fiddlehead</h1>
            <CodeViewer code="console.log(1)\n//heheheheheh" language="js" options={{'data-line': '1'}}/>
            <Intro/>
            <Demo/>
        </div>
    );
};
