import './PlaygroundViewer.less';
import {useState} from 'fiddlehead';
import {FiddleheadPlayer} from './FiddleheadPlayer';

export let PlaygroundViewer = ({modules}) => {
    const [codes, setCodes] = useState(() => {
        const initial = {};
        modules.forEach(({filename, code}) => {
            initial[filename] = code;
        });
        return initial;
    });

    return (
        <div class="PlaygroundViewer">
            <div class="editor">
                {modules.map(({filename}) => {
                    return (
                        <div key={filename}>
                            <code>{filename}</code>
                            <textarea
                                value={codes[filename]}
                                onInput={(event) => {
                                    setCodes((prevCodes) => ({
                                        ...prevCodes,
                                        [filename]: event.target.value
                                    }));
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <div class="player">
                {modules.length > 0 &&
                    <FiddleheadPlayer
                        entryFilename={modules[0].filename}
                        codes={codes}
                    />
                }
            </div>
        </div>
    );
};
