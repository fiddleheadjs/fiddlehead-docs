import './FileEditor.less';
import {useState} from 'fiddlehead';
import {CodeArea} from '../../../components/code-area/CodeArea';
import {CautionIcon} from '../../../icons/CautionIcon';
import {Section} from '../section/Section';
import {Loading} from '../../../components/loading/Loading';

export let FileEditor = ({file, onChange, defaultOpen}) => {
    let [loadingState, setLoadingState] = useState({
        inProgress: false,
        error: null
    });

    return (
        <Section
            class="FileEditor"
            title={file.filename}
            actions={
                <>
                    {loadingState.inProgress && (
                        <span class="status">
                            <Loading label={null} />
                        </span>
                    )}
                    {loadingState.error !== null && (
                        <span class="status" title={loadingState.error}>
                            <CautionIcon />
                        </span>
                    )}
                </>
            }
            defaultOpen={defaultOpen}
        >
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
        </Section>
    );
};
