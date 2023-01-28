import './FiddleheadSandbox.less';
import {useEffect, useRef} from 'fiddlehead';
import iframeContent from './iframeContent.html';
import {transform as babelTransform} from '@babel/standalone';
import {consoleTransplant} from '../console/transplant';
import {space} from '../../../style/theme';

export let FiddleheadSandbox = ({
    entryFilename,
    files,
    errorHandle,
    consoleCommandHandle,
    onConsoleTransplanted,
}) => {
    let iframeRef = useRef(null);

    useEffect(() => {
        let iframe = iframeRef.current;

        if (iframe === null) {
            return;
        }

        let win = iframe.contentWindow;

        let setupAndRun = () => {
            win.playground_src = {
                entryFilename,
                files,
            };

            let fiddlehead = makeModule(win, __srcFiddlehead__, {});

            let fiddleheadStore = makeModule(win, __srcFiddleheadStore__, {
                'fiddlehead': fiddlehead,
            });

            win.playground_deps = {
                'fiddlehead': fiddlehead,
                'fiddlehead/store': fiddleheadStore,
            };

            win.playground_exec = {
                fiddlehead,
                babelTransform,
            };

            consoleTransplant(win.console, consoleCommandHandle);
            onConsoleTransplanted(win.console);

            observeIframeContentHeight(win, (newHeight) => {
                // Add 2px to deal with the pixel manipulation of browsers
                iframe.style.height = `${newHeight + 2}px`;
            });

            win.addEventListener('error', (event) => {
                errorHandle(event.error);
            });

            win.playground_run();
        };

        if (win.playground_run !== undefined) {
            setupAndRun();
        } else {
            // Almost time this case will happen
            iframe.addEventListener('load', setupAndRun);
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
            errorHandle(null);
            
            // Reset the iframe height
            iframe.style.height = '0px';

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

let makeModule = (win, source, deps) => {
    let fn = new win.Function('require', 'exports', source);
    let require = (depName) => deps[depName];
    let exports = {};
    fn(require, exports);
    return exports;
};

let observeIframeContentHeight = (win, callback) => {
    let observer = new win.MutationObserver(() => {
        let doc = win.document.documentElement;

        if (doc.scrollHeight > doc.clientHeight) {
            callback(doc.scrollHeight);
        }
    });

    observer.observe(win.document.body, {
        childList: true,
        attributes: true,
        subtree: true,
    });
};
