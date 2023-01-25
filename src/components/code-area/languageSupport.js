import {Compartment} from '@codemirror/state';
import {javascript} from '@codemirror/lang-javascript';
import {css} from '@codemirror/lang-css';

let getLanguageSupport = (language) => {
    if (language === 'css') {
        return css();
    }

    if (language === 'js' || language === 'jsx') {
        return javascript({jsx: true});
    }

    if (language === 'ts' || language === 'tsx') {
        return javascript({jsx: true, typescript: true});
    }

    return null;
};

export let getLanguageCompartment = (language) => {
    let languageSupport = getLanguageSupport(language);

    if (languageSupport !== null) {
        return new Compartment().of(languageSupport);
    }

    return null;
};
