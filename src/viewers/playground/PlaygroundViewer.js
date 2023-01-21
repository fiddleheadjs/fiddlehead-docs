import './PlaygroundViewer.less';
import {useState} from 'fiddlehead';
import {FiddleheadPlayer} from './fiddlehead-player/FiddleheadPlayer';
import {FileView} from './file-view/FileView';

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
            <div class="editor">
                {fileList.map(({filename}) => {
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
                {fileList.length > 0 &&
                    <FiddleheadPlayer
                        entryFilename={entryFilename}
                        files={files}
                    />
                }
            </div>
        </div>
    );
};
