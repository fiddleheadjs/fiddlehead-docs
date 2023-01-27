import './PlaygroundViewer.less';
import {useState} from 'fiddlehead';
import {FileEditor} from './file-editor/FileEditor';
import {Player} from './player/Player';
import {Console} from './console/Console';

export let PlaygroundViewer = ({fileList}) => {
    let [files, setFiles] = useState(() => {
        let initial = {};
        fileList.forEach((file) => {
            initial[file.filename] = file;
        });
        return initial;
    });

    let [consoleItems, setConsoleItems] = useState([]);

    let entryFilename = fileList.length > 0 ? fileList[0].filename : null;

    return (
        <div class="PlaygroundViewer">
            {fileList.map(({filename, open}) => (
                <FileEditor
                    key={filename}
                    file={files[filename]}
                    onChange={(updatedFile) => {
                        setFiles((prevFiles) => ({
                            ...prevFiles,
                            [filename]: updatedFile
                        }));
                    }}
                    defaultOpen={open}
                />
            ))}
            {fileList.length > 0 && (
                <Player
                    entryFilename={entryFilename}
                    files={files}
                    handleConsoleCommand={(name, value) => {
                        setConsoleItems((prevConsoleItems) => {
                            if (name === 'clear') {
                                return [];
                            }
                            return [...prevConsoleItems, [name, value]];
                        });
                    }}
                />
            )}
            {consoleItems.length > 0 && (
                <Console
                    items={consoleItems}
                    clear={() => setConsoleItems([])}
                />
            )}
        </div>
    );
};
