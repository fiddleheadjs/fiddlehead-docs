import './FileView.less';
import {useState} from 'fiddlehead';
import {CodeArea} from '../../../components/code-area/CodeArea';

export let FileView = ({file, onChange, defaultCollapsed}) => {
    let [collapsed, setCollapsed] = useState(defaultCollapsed);

    return (
        <div class="FileView">
            <div
                class="filename"
                onClick={() => setCollapsed(t => !t)}
            >
                {file.filename}
            </div>
            {
                !collapsed &&
                <CodeArea
                    defaultValue={file.code}
                    onChange={(value) => {
                        onChange({
                            filename: file.filename,
                            language: file.language,
                            code: value
                        });
                    }}
                    language={file.language}
                />
            }
        </div>
    );
};
