import {useEffect, useState} from 'fiddlehead';
import * as fiddlehead from 'fiddlehead';
import {Button} from '@components/button/Button';
import {transform, availablePresets, availablePlugins} from '@babel/standalone';

console.log({availablePresets, availablePlugins})

function appendScript(code) {
    const script = document.createElement('script');
    script.innerText = code;
    document.head.appendChild(script);
}

export default function Counter({console}) {
    let [count, setCount] = useState(0);
    
    const displayCode = `
    import {render, useEffect} from 'fiddlehead';

    export default function App() {
        useEffect(() => {
            console.log('Inner module');
        }, []);

        console.log('hehehe')

        return (
            <div>
                hahahahaha
            </div>
        );
    }
    `;
    
    const jsxImportCode = `import {jsx} from 'fiddlehead'`;

    const inputCode = `
        ${jsxImportCode}
        ${displayCode}
    `;

    useEffect(() => {
        const outputCode = transform(inputCode, {
            sourceType: 'module',
            presets: [
                'env',
            ],
            plugins: [
                ['transform-react-jsx', {
                    pragma: 'jsx',
                    pragmaFrag: "'['",
                }]
            ],
        }).code;

        console.log(outputCode);

        const require = (moduleName) => {
            if (moduleName === 'fiddlehead') {
                return fiddlehead;
            }
            
            throw new Error('Module not found: ' + moduleName);
        };

        const exports = {};

        eval(outputCode);

        console.log(fiddlehead.jsx(exports.default, null));
        console.log(document.getElementById('sandbox-root'));

        const root = document.createElement('div');

        fiddlehead.render(fiddlehead.jsx(exports.default, null), root);

        document.getElementById('sandbox-root').appendChild(root);
    }, []);

    return (
        <div>
            <div id="sandbox-root"/>
        </div>
    );
}
