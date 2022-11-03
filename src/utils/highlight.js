import Prism from 'prismjs';

Prism.manual = true;

export let highlightAllUnder = Prism.highlightAllUnder;

export let highlightElement = Prism.highlightElement;

export let parseLanguageNotation = (notation) => {
    let match = notation.match(/^(\w+)(.*)$/);
    
    if (match === null) {
        return ['', {}];
    }

    let language = match[1];
    let options = {};
    if (match[2] !== '') {
        try {
            options = JSON.parse(match[2]);
        } catch (error) {
            console.error(error);
        }
    }

    return [language, options];
};
