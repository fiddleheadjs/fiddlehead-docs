import './FiddleheadPlayer.less';
import {useEffect, useRef} from 'fiddlehead';
import * as fiddlehead from 'fiddlehead';
import * as fiddleheadStore from 'fiddlehead/store';
import {Button} from '../../components/button/Button';
import {__} from '../../modules/i18n';
import {PlayIcon} from '../../icons/PlayIcon';
let waitForBabel = import('@babel/standalone');

let babel__ = null;

waitForBabel.then((babel) => {
    babel__ = babel;
});

export let FiddleheadPlayer = ({entryFilename, codes}) => {
    let containerRef = useRef(null);

    let require = (moduleName) => {
        if (moduleName === 'fiddlehead') {
            return fiddlehead;
        }

        if (moduleName === 'fiddlehead/store') {
            return fiddleheadStore;
        }

        if (codes[moduleName] !== undefined) {
            return runModule(codes[moduleName]);
        }

        let skippableExtensions = ['js', 'jsx', 'ts', 'tsx'];

        for (let extension of skippableExtensions) {
            let filename = moduleName + '.' + extension;
            if (codes[filename] !== undefined) {
                return runModule(codes[filename]);
            }
        }

        throw new Error('Module not found: ' + moduleName);
    };

    let runModule = (displayCode) => {
        if (babel__ === null) {
            console.error('Babel has not been loaded yet');
            return {};
        }

        let jsxImportCode = `import {jsx as _jsx} from 'fiddlehead'`;

        let inputCode = `
            ${jsxImportCode}
            ${displayCode}
        `;

        let outputCode = babel__.transform(inputCode, {
            sourceType: 'module',
            presets: [
                'env',
            ],
            plugins: [
                ['transform-react-jsx', {
                    pragma: '_jsx',
                    pragmaFrag: '"["',
                }]
            ],
        }).code;

        let execute = new Function('require', 'exports', outputCode);

        let exports = {};

        execute(require, exports);

        return exports;
    };

    const play = () => {
        waitForBabel.then(() => {
            let container = containerRef.current;
            if (container === null) {
                return;
            }

            let entryCode = codes[entryFilename];
    
            let exports = runModule(entryCode);
    
            let appRoot = document.createElement('div');
    
            fiddlehead.render(fiddlehead.jsx(exports.default, null), appRoot);
    
            while (container.firstChild !== null) {
                container.removeChild(container.firstChild);
            }
    
            container.appendChild(appRoot);
        });
    };

    useEffect(() => {
        play();
    }, []);

    return (
        <div class="FiddleheadPlayer">
            <div class="actions">
                <Button onClick={play}>
                    <PlayIcon/>
                    <span>{__('Compile')}</span>
                </Button>
            </div>
            <div class="container" ref={containerRef} />
        </div>
    );
};
