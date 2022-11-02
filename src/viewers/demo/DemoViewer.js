import './DemoViewer.less';
import {useState} from 'fiddlehead';
import {CodeViewer} from '../code/CodeViewer';

export let DemoViewer = ({Component, code}) => {
    const [showsCode, setShowsCode] = useState(false);

    return (
        <div class="DemoViewer">
            <div class="component-box">
                <Component/>
            </div>
            <div class="action-bar">
                <button
                    type="button"
                    onClick={() => setShowsCode(t => !t)}
                >
                    {showsCode ? 'Hide code' : 'Show code'}
                </button>
            </div>
            {
                showsCode &&
                <div class="code-box">
                    <CodeViewer
                        code={code}
                        language="jsx"
                    />
                </div>
            }
        </div>
    );
};
