import './DemoViewer.less';
import {useState} from 'fiddlehead';
import {CodeViewer} from '../code/CodeViewer';

export let DemoViewer = ({Component, code}) => {
    const [showsCode, setShowsCode] = useState(false);

    return (
        <div className="DemoViewer">
            <div className="component-box">
                <Component/>
            </div>
            <div className="action-bar">
                <button
                    type="button"
                    onClick={() => setShowsCode(t => !t)}
                >
                    {showsCode ? 'Hide code' : 'Show code'}
                </button>
            </div>
            {
                showsCode &&
                <div className="code-box">
                    <CodeViewer
                        code={code}
                        language="jsx"
                    />
                </div>
            }
        </div>
    );
};
