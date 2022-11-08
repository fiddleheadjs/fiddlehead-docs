import './DemoViewer.less';
import {useState} from 'fiddlehead';
import {CodeViewer} from '../code/CodeViewer';
import {__} from '../../modules/i18n';
import {Button} from '../../components/button/Button';
import {useLogger} from '../../modules/logger';

export let DemoViewer = ({Component, code}) => {
    let [showsOutput, setShowsOutput] = useState(false);

    let logger = useLogger();

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
                <div class="output-box">
                    <div class="ui">
                        <Component console={logger} />
                    </div>
                    {
                        logger.lines.length > 0 &&
                        <div class="console">
                            <div class="heading">Console</div>
                            <pre class="body">
                                <code>
                                    {logger.lines.map(([level, chunks]) => (
                                        <div class={level}>
                                            {chunks.join(' ')}
                                        </div>
                                    ))}
                                </code>
                            </pre>
                        </div>
                    }
                </div>
            }
        </div>
    );
};
