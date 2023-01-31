let Prism = require('prismjs');
// Load Prism grammars:
require('prismjs/components/prism-markup');
require('prismjs/components/prism-css');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-json');
require('prismjs/components/prism-bash');

let highlight = (code, language) => {
    if (language === 'js') {
        language = 'jsx';
    }

    let grammar = Prism.languages[language] ?? Prism.languages.plaintext;

    return Prism.highlight(code, grammar, language);
};

module.exports = {
    highlight,
};
