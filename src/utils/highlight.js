import Prism from 'prismjs';
Prism.manual = true;

export let highlight = (code, language) => {
    let grammar;

    switch (language) {
        case 'js':
        case 'jsx':
            grammar = Prism.languages.jsx;
            break;
        case 'bash':
            grammar = Prism.languages.bash;
            break;
        case 'json':
            grammar = Prism.languages.json;
            break;
        case 'css':
            grammar = Prism.languages.css;
            break;
        case 'markup':
            grammar = Prism.languages.markup;
            break;
        default:
            grammar = Prism.languages.plaintext;
    }

    return Prism.highlight(code, grammar, language);
};
