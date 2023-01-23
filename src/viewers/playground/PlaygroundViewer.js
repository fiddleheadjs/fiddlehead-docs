import './PlaygroundViewer.less';
import {useState} from 'fiddlehead';
import {FileEditor} from './file-editor/FileEditor';
import {Player} from './player/Player';

export let PlaygroundViewer = ({fileList}) => {
    let [files, setFiles] = useState(() => {
        let initial = {};
        fileList.forEach((file) => {
            initial[file.filename] = file;
        });
        return initial;
    });

    let entryFilename = fileList.length > 0 ? fileList[0].filename : null;

    return (
        <div class="PlaygroundViewer">
            {fileList.map(({filename}) => (
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
            ))}
            {fileList.length > 0 &&
                <Player
                    entryFilename={entryFilename}
                    files={files}
                />
            }
        </div>
    );
};
