import './PlaygroundViewer.less';
import {useEffect, useRef, useState} from 'fiddlehead';
import {FileEditor} from './file-editor/FileEditor';
import {Display} from './display/Display';
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

    let [preservesLog, setPreservesLog] = useState(false);

    useEffect(() => {
        if (consoleItems.length > 0) {
            setShowsConsole(true);
            return;
        }

        // Wait a moment to close the console
        let timeoutId = setTimeout(() => {
            setShowsConsole(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [consoleItems.length]);

    let entryFilename = fileList.length > 0 ? fileList[0].filename : null;

    let consoleCommandHandle = (name, value) => {
        if (name === 'clear') {
            return setConsoleItems([[name, value]]);
        }
        if (value == null) {
            return;
        }
        setConsoleItems((prevConsoleItems) => {
            return [...prevConsoleItems, [name, value]];
        });
    };

    let clearConsole = () => {
        // Clear the sandbox console (including the iframe's console)
        if (sandboxConsole.current !== null) {
            sandboxConsole.current.clear();
        }

        // Set to an empty array to close the console
        setConsoleItems([]);
    };

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
                        if (!preservesLog) {
                            clearConsole();
                        }
                    }}
                    defaultOpen={open}
                />
            ))}
            {fileList.length > 0 && (
                <Display
                    entryFilename={entryFilename}
                    files={files}
                    consoleCommandHandle={consoleCommandHandle}
                    onConsoleTransplanted={(console) => {
                        sandboxConsole.current = console;
                    }}
                />
            )}
            {showsConsole && (
                <Console
                    items={consoleItems}
                    clear={clearConsole}
                    preservesLog={preservesLog}
                    setPreservesLog={setPreservesLog}
                />
            )}
        </div>
    );
};
