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
                <div class="component-box">
                    <Component logger={logger} />
                </div>
            }
            {
                showsOutput &&
                logger.lines.length > 0 &&
                <div class="console">
                    <pre>
                        <code>
                            {logger.lines.map(([level, chunks]) => {
                                console.log(chunks); return (
                                    <div class={level}>
                                        {chunks.join(' ')}
                                    </div>
                                )
                            })}
                        </code>
                    </pre>
                </div>
            }
        </div>
    );
};
