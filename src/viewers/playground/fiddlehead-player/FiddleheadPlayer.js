import './FiddleheadPlayer.less';
import {useEffect, useRef} from 'fiddlehead';
import {Button} from '../../../components/button/Button';
import {__} from '../../../modules/i18n';
import {PlayIcon} from '../../../icons/PlayIcon';
import iframeContent from './iframeContent.html';
import * as fiddlehead from 'fiddlehead/lib/core/esm.development';
import * as fiddleheadStore from 'fiddlehead/lib/store/esm.development';

let waitForBabel = import('@babel/standalone');

export let FiddleheadPlayer = ({entryFilename, codes}) => {
    let iframeRef = useRef(null);

    const play = () => {
        waitForBabel.then((babel) => {
            let iframe = iframeRef.current;

            if (iframe === null) {
                return;
            }

            let win = iframe.contentWindow;

            win.playground_src = {
                entryFilename,
                codes,
            };

            win.playground_modules = {
                'babel': babel,
                'fiddlehead': fiddlehead,
                'fiddlehead/store': fiddleheadStore,
            };

            if (win.playground !== undefined) {
                win.playground.run();
            } else {
                win.addEventListener('DOMContentLoaded', () => {
                    win.playground.run();
                });
            }
        });
    };

    useEffect(() => {
        play();
    }, []);

    return (
        <div class="FiddleheadPlayer">
            <div class="actions">
                <Button onClick={play}>
                    <PlayIcon />
                    <span>{__('Compile')}</span>
                </Button>
            </div>
            <iframe
                class="container"
                srcDoc={iframeContent}
                ref={iframeRef}
            />
        </div>
    );
};
