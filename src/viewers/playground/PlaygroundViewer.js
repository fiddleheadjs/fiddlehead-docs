import './PlaygroundViewer.less';
import {useEffect, useRef, useState} from 'fiddlehead';
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

    let sandboxConsole = useRef(null);

    let [consoleItems, setConsoleItems] = useState([]);

    let [showsConsole, setShowsConsole] = useState(false);

    useEffect(() => {
        if (consoleItems.length > 0) {
            setShowsConsole(true);
            return;
        }

        // Close after a moment
        let timeoutId = setTimeout(() => {
            setShowsConsole(false);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [consoleItems.length]);

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
                    consoleCommandHandle={(name, value) => {
                        setConsoleItems((prevConsoleItems) => {
                            if (name === 'clear') {
                                return [[name, value]];
                            }
                            return [...prevConsoleItems, [name, value]];
                        });
                    }}
                    onConsoleTransplanted={(console) => {
                        sandboxConsole.current = console;
                    }}
                />
            )}
            {showsConsole && (
                <Console
                    items={consoleItems}
                    clear={() => {
                        // Clear the sandbox console (including the iframe's console)
                        sandboxConsole.current.clear();

                        // Set to an empty array to close the console card
                        setConsoleItems([]);
                    }}
                />
            )}
        </div>
    );
};
