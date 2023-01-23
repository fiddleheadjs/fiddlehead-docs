import './PlaygroundViewer.less';
import {useState} from 'fiddlehead';
import {FiddleheadPlayer} from './fiddlehead-player/FiddleheadPlayer';
import {FileEditor} from './file-editor/FileEditor';

export let PlaygroundViewer = ({fileList}) => {
    const [files, setFiles] = useState(() => {
        const initial = {};
        fileList.forEach((file) => {
            initial[file.filename] = file;
        });
        return initial;
    });

    const entryFilename = fileList.length > 0 ? fileList[0].filename : null;

    return (
        <div class="PlaygroundViewer">
            {fileList.map(({filename}) => {
                return (
                    <FileEditor
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
            {fileList.length > 0 &&
                <FiddleheadPlayer
                    entryFilename={entryFilename}
                    files={files}
                />
            }
        </div>
    );
};
