import './FiddleheadSandbox.less';
import {useCallback, useEffect, useRef} from 'fiddlehead';
import iframeContent from './iframeContent.html';
import {transform as babelTransform} from '@babel/standalone';
import {consoleTransplant} from '../console/transplant';

export let FiddleheadSandbox = ({
    entryFilename,
    files,
    errorHandle,
    consoleCommandHandle,
    onConsoleTransplanted,
}) => {
    let iframeRef = useRef(null);
    let initialized = useRef(false);

    let init = useCallback((win, iframe) => {
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

        win.playground_callbacks = {
            onErrorUnhandled: (error) => {
                errorHandle(error);
            }
        };

        initialized.current = true;
    }, []);

    useEffect(() => {
        let iframe = iframeRef.current;
        let win = iframe.contentWindow;

        if (win.playground_run !== undefined) {
            init(win, iframe);
            win.playground_run();
            return;
        }

        // Almost time this case will happen
        iframe.addEventListener('load', () => {
            init(win, iframe);
            win.playground_run();
        });
    }, []);

    useEffect(() => {
        if (!initialized.current) {
            return;
        }

        let iframe = iframeRef.current;
        let win = iframe.contentWindow;

        let timeoutId = setTimeout(() => {
            // Clear the old error if any
            errorHandle(null);
            
            // We use documentElement.scrollHeight to set the iframe height,
            // scrollHeight is never less than clientHeight,
            // so the iframe height has no chance to reduce.
            // So there, we make a chance to recalculate the iframe height
            // each time files are updated.
            iframe.style.height = '0px';

            win.playground_src = {
                entryFilename,
                files,
            };

            win.playground_run();
        }, 500);

        return () => clearTimeout(timeoutId);;
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
