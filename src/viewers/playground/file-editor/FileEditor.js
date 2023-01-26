import './FileEditor.less';
import {useState} from 'fiddlehead';
import {CodeArea} from '../../../components/code-area/CodeArea';
import {Spinner} from '../../../components/spinner/Spinner';
import {CautionIcon} from '../../../icons/CautionIcon';

export let FileEditor = ({file, onChange, defaultOpen}) => {
    let [open, setOpen] = useState(defaultOpen);
    let [loadingState, setLoadingState] = useState({inProgress: false, error: null});

    return (
        <div class="FileEditor">
            <div
                class="heading"
                onClick={() => setOpen(t => !t)}
            >
                <span class="filename">
                    {file.filename}
                </span>
                {loadingState.inProgress && (
                    <span class="status">
                        <Spinner />
                    </span>
                )}
                {loadingState.error !== null && (
                    <span class="status" title={loadingState.error}>
                        <CautionIcon />
                    </span>
                )}
            </div>
            {
                open &&
                <CodeArea
                    defaultValue={file.code}
                    onChange={(value) => {
                        onChange({
                            filename: file.filename,
                            language: file.language,
                            code: value
                        });
                    }}
                    onLoadingStateChange={setLoadingState}
                    language={file.language}
                />
            }
        </div>
    );
};
