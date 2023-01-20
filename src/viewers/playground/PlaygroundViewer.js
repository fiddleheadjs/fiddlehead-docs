import './PlaygroundViewer.less';
import {useState} from 'fiddlehead';
import {FiddleheadPlayer} from './fiddlehead-player/FiddleheadPlayer';
import {TextArea} from '../../components/text-area/TextArea';

export let PlaygroundViewer = ({modules}) => {
    const [files, setFiles] = useState(() => {
        const initial = {};
        modules.forEach(({language, filename, code}) => {
            initial[filename] = {language, filename, code};
        });
        return initial;
    });

    return (
        <div class="PlaygroundViewer">
            <div class="editor">
                {modules.map(({language, filename}) => {
                    return (
                        <div key={filename} class="file">
                            <code>{filename}</code>
                            <TextArea
                                defaultValue={files[filename].code}
                                onInput={(event) => {
                                    setFiles((prevFiles) => ({
                                        ...prevFiles,
                                        [filename]: {
                                            language: language,
                                            filename: filename,
                                            code: event.target.value
                                        }
                                    }));
                                }}
                                spellcheck="false"
                            />
                        </div>
                    );
                })}
            </div>
            <div class="player">
                {modules.length > 0 &&
                    <FiddleheadPlayer
                        entryFilename={modules[0].filename}
                        files={files}
                    />
                }
            </div>
        </div>
    );
};
