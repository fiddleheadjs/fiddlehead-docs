import './DemoViewer.less';
import {useState} from 'fiddlehead';
import {CodeViewer} from '../code/CodeViewer';
import {__} from '../../modules/i18n';
import {Button} from '../../components/button/Button';

export let DemoViewer = ({Component, code}) => {
    const [showsOutput, setShowsOutput] = useState(false);

    return (
        <div class="DemoViewer">
            <div class="code-box">
                <CodeViewer
                    code={code}
                    language="jsx"
                />
            </div>
            <div class="action-bar">
                <Button onClick={() => setShowsOutput(t => !t)}>
                    {showsOutput ? __('Hide Output') : __('Show Output')}
                </Button>
            </div>
            {
                showsOutput &&
                <div class="component-box">
                    <Component/>
                </div>
            }
        </div>
    );
};
