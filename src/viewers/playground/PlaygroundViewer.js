import './PlaygroundViewer.less';
import {useState} from 'fiddlehead';
import {FiddleheadPlayer} from './fiddlehead-player/FiddleheadPlayer';
import {FileView} from './file-view/FileView';

export let PlaygroundViewer = ({modules}) => {
    const [files, setFiles] = useState(() => {
        const initial = {};
        modules.forEach(({language, filename, code}) => {
            initial[filename] = {language, filename, code};
        });
        return initial;
    });

    const entryFilename = modules.length > 0 ? modules[0].filename : null;

    return (
        <div class="PlaygroundViewer">
            <div class="editor">
                {modules.map(({filename}) => {
                    return (
                        <FileView
                            key={filename}
                            file={files[filename]}
                            onChange={(updatedFile) => {
                                setFiles((prevFiles) => ({
                                    ...prevFiles,
                                    [filename]: updatedFile
                                }));
                            }}
                            defaultCollapsed={filename !== entryFilename}
                        />
                    );
                })}
            </div>
            <div class="player">
                {modules.length > 0 &&
                    <FiddleheadPlayer
                        entryFilename={entryFilename}
                        files={files}
                    />
                }
            </div>
        </div>
    );
};
