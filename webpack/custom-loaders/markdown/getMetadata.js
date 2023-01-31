let marked = require('marked');
let generateHeadingId = require('./generateHeadingId');

let tokenizer = {
    html(src) {
        let playgroundMatch = src.match(/^ *<playground(?:\s+(.*)\s*)?>\s*([\S\s]*?)\s*<\/playground\s*>/);
        if (playgroundMatch !== null) {
            
            let token = {
                type: 'html',
                raw: playgroundMatch[0],
                text: '<playground></playground>',
                tag: 'playground',
                attrs: playgroundMatch[1] ?? '',
                tokens: [],
            };

            this.lexer.blockTokens(playgroundMatch[2], token.tokens);

            return token;
        }

        // let playgroundOpenMatch = src.match(/^ *<playground(?:\s+(.*)\s*)?>/);
        // if (playgroundOpenMatch !== null) {
        //     return {
        //         type: 'playground_open',
        //         raw: playgroundOpenMatch[0],
        //         text: playgroundOpenMatch[1],
        //     };
        // }

        // let playgroundCloseMatch = src.match(/^ *<\/playground\s*>/);
        // if (playgroundCloseMatch !== null) {
        //     return {
        //         type: 'playground_close',
        //         raw: playgroundCloseMatch[0],
        //     };
        // }

        // return false to use original codespan tokenizer
        return false;
    }
};

module.exports = function getMetadata(markdown) {
    let title = null;
    let description = null;
    let headings = [];
    let headingChain = [0, 0, 0, 0, 0, 0];
    let codeSnippets = [];
    let playgrounds = [];

    marked.use({
        tokenizer,
        walkTokens(token) {
            console.log(token);
            if (token.type === 'heading') {
                if (token.depth === 1) {
                    if (title === null) {
                        title = token.text;
                    }
                } else {
                    let posInChain = token.depth - 1;

                    // Replace the heading locates in the chain at the position corresponding to current heading level
                    headingChain[posInChain] = token.text;

                    // And remove the following chain (set = 0)
                    for (let i = posInChain + 1; i < headingChain.length; i++) {
                        headingChain[i] = 0;
                    }

                    headings.push({
                        text: token.text,
                        level: token.depth,
                        id: generateHeadingId(headingChain.filter(t => t !== 0)),
                    });
                }
                return;
            }

            if (token.type === 'paragraph') {
                if (title !== null && description === null) {
                    description = token.text;
                }
                return;
            }

            if (token.type === 'html') {

            }
        },
    });

    let headingPosRef = {current: -1};

    let renderer = new marked.Renderer();

    renderer.heading = (text, level) => {
        if (level === 1) {
            return `<h${level}>${text}</h${level}>`;
        }

        headingPosRef.current++;
        let {id} = headings[headingPosRef.current];

        // Relate to passing the top bar when scroll-into-view.
        // Headings have their z-index attributes in descending order,
        // to avoid overlap ones above due to their padding-top.
        let zIndex = 2 + headings.length - headingPosRef.current;

        return (
            `<h${level} id="${id}" style="z-index:${zIndex}">` +
            `<span>${text}</span>` +
            `<a href="#${id}">${linkSvg}</a>` +
            `</h${level}>`
        );
    };

    renderer.table = (header, body) => {
        return (
            `<div class="table-wrapper">` +
            `<table>${header}${body}</table>` +
            `</div>`
        );
    };

    renderer.code = (code, language) => {
        let options = '';
        
        // Pattern: /** options go here */
        let match = code.match(/^\s*\/\*\*\s*(.*?)\s*\*\/\s*\r?\n/);
        if (match !== null) {
            options = match[1];
            code = code.substring(match[0].length);
        }

        code = code.replace(/\s+$/, '');

        code = code
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        return (
            `<div class="code-snippet"${options && ' ' + options}>` +
            `<pre class="language-${language}">` +
            `<code class="language-${language}">${code}</code>` +
            `</pre>` +
            `</div>`
        );
    };

    const markedOptions = {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        renderer: renderer,
    };

    
    console.log(marked.marked(markdown, markedOptions));

    return {title, description, headings};
}
