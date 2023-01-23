import './FiddleheadPlayer.less';
import {useEffect, useRef, useState} from 'fiddlehead';
import {__} from '../../../modules/i18n';
import iframeContent from './iframeContent.html';
import {CautionIcon} from '../../../icons/CautionIcon';
import {CircleCheckIcon} from './../../../icons/CircleCheckIcon';

let waitForBabel = import('@babel/standalone');

export let FiddleheadPlayer = ({entryFilename, files}) => {
    let iframeRef = useRef(null);

    let [error, setError] = useState(null);

    useEffect(() => {
        waitForBabel.then((babel) => {
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
                'babel': babel,
                'fiddlehead': fiddlehead,
                'fiddlehead/store': fiddleheadStore,
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
        });
    }, []);

    useEffect(() => {
        let iframe = iframeRef.current;

        if (iframe === null) {
            return;
        }

        let win = iframe.contentWindow;

        if (win.playground_mounted !== true) {
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
        <div class="FiddleheadPlayer">
            <div class="heading">
                {
                    error === null &&
                    <>
                        <CircleCheckIcon />
                        <span>{__('Result')}</span>
                    </>
                }
                {
                    error !== null &&
                    <>
                        <CautionIcon />
                        <span>{__('Error')}</span>
                    </>
                }
            </div>
            <div class="body">
                <iframe
                    srcdoc={iframeContent}
                    ref={iframeRef}
                />
                {
                    error !== null &&
                    <pre class="error">
                        {`${error.name}: ${error.message}`}
                    </pre>
                }
            </div>
        </div>
    );
};
