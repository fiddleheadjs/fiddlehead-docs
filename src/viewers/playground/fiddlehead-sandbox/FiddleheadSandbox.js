import './FiddleheadSandbox.less';
import {useEffect, useRef} from 'fiddlehead';
import iframeContent from './iframeContent.html';
import {transform as babelTransform} from '@babel/standalone';

export let FiddleheadSandbox = ({entryFilename, files, setError}) => {
    let iframeRef = useRef(null);

    useEffect(() => {
        let iframe = iframeRef.current;

        if (iframe === null) {
            return;
        }

        let win = iframe.contentWindow;

        win.playground_src = {
            entryFilename,
            files,
        };

        let makeModule = (source, deps) => {
            let fn = new win.Function('require', 'exports', source);
            let require = (depName) => deps[depName];
            let exports = {};
            fn(require, exports);
            return exports;
        };

        let fiddlehead = makeModule(__srcFiddlehead__);

        let fiddleheadStore = makeModule(__srcFiddleheadStore__, {
            'fiddlehead': fiddlehead
        });

        win.playground_deps = {
            'fiddlehead': fiddlehead,
            'fiddlehead/store': fiddleheadStore,
        };

        win.playground_exec = {
            fiddlehead,
            babelTransform,
        };

        win.addEventListener('error', function (event) {
            setError(event.error);
        });

        if (win.playground_run !== undefined) {
            win.playground_run();
        } else {
            win.addEventListener('DOMContentLoaded', () => {
                win.playground_run();
            });
        }
    }, []);

    useEffect(() => {
        let iframe = iframeRef.current;

        if (iframe === null) {
            return;
        }

        let win = iframe.contentWindow;

        if (win.playground_started !== 1) {
            return;
        }

        let timeoutId = setTimeout(() => {
            setError(null);

            win.playground_src = {
                entryFilename,
                files,
            };

            win.playground_run();
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [entryFilename, files]);

    return (
        <iframe
            class="FiddleheadSandbox"
            srcdoc={iframeContent}
            ref={iframeRef}
        />
    );
};
