let marked = require('marked');
let generateHeadingId = require('./generateHeadingId');
let linkSvg = require('./linkSvg');
let {highlight} = require('./prism');
let {parseCode} = require('./utils');

let tokenizer = {
    html(src) {
        let playgroundMatch = src.match(/^ *<playground(?:\s+(.*)\s*)?> *\r?\n\r?\n\s*([\S\s]*?)\s*\r?\n\r?\n *<\/playground\s*>/);
        if (playgroundMatch !== null) {
            let id = Math.random().toString(36).substring(2);
            let token = {
                type: 'html',
                raw: playgroundMatch[0],
                text: `<playground data-id="${id}"></playground>`,
                tag: 'playground',
                id: id,
                attrs: playgroundMatch[1] ?? '',
                tokens: [],
            };

            this.lexer.blockTokens(playgroundMatch[2], token.tokens);

            return token;
        }

        // return false to use original codespan tokenizer
        return false;
    }
};

let createWalkTokens = (refs) => {
    let headingChain = [0, 0, 0, 0, 0, 0];
    let currentPlayground = null;
    let currentPlaygroundTokens = [];

    return function walkTokens(token) {
        if (currentPlayground !== null) {
            if (currentPlaygroundTokens.includes(token)) {
                if (token.type === 'code') {
                    let {attrs, code} = parseCode(token.text);

                    currentPlayground.fileList.push({
                        language: token.lang,
                        code: code,
                        highlightedCode: highlight(code, token.lang),
                        filename: attrs['filename'],
                        open: attrs.hasOwnProperty('open'),
                    });
                }
                return;
            }

            currentPlayground = null;
            currentPlaygroundTokens = [];
        }

        if (token.type === 'heading') {
            if (token.depth === 1) {
                if (refs.title === null) {
                    refs.title = marked.parseInline(token.text);
                }
            } else {
                let posInChain = token.depth - 1;

                // Replace the heading locates in the chain at the position corresponding to current heading level
                headingChain[posInChain] = token.text;

                // And remove the following chain (set = 0)
                for (let i = posInChain + 1; i < headingChain.length; i++) {
                    headingChain[i] = 0;
                }

                refs.headings.push({
                    text: marked.parseInline(token.text),
                    level: token.depth,
                    id: generateHeadingId(headingChain.filter(t => t !== 0)),
                });
            }
            return;
        }

        if (token.type === 'blockquote') {
            if (refs.description === null) {
                refs.description = marked.parseInline(token.text.trim());
            }
            return;
        }

        if (token.tag === 'playground') {
            currentPlaygroundTokens = token.tokens;
            currentPlayground = {
                id: token.id,
                fileList: [],
            };
            refs.playgrounds.push(currentPlayground);
            return;
        }
    };
};

let createRenderer = (headings) => {
    let renderer = new marked.Renderer();

    let titleReached = false;
    let descriptionReached = false;
    let currentHeadingIndex = -1;

    renderer.heading = (text, level) => {
        if (level === 1) {
            if (!titleReached) {
                titleReached = true;
                return '';
            }
        }

        currentHeadingIndex++;
        let {id} = headings[currentHeadingIndex];

        // Relate to passing the top bar when scroll-into-view.
        // Headings have their z-index attributes in descending order,
        // to avoid overlap ones above due to their padding-top.
        let zIndex = 2 + headings.length - currentHeadingIndex;

        return (
            `<h${level} id="${id}" style="z-index:${zIndex}">` +
            `<span>${text}</span>` +
            `<a href="#${id}">${linkSvg}</a>` +
            `</h${level}>`
        );
    };

    renderer.blockquote = (quote) => {
        if (!descriptionReached) {
            descriptionReached = true;
            return '';
        }

        return `<blockquote>\n${quote}</blockquote>\n`;
    };

    renderer.table = (header, body) => {
        return (
            `<div class="table-wrapper">` +
            `<table>${header}${body}</table>` +
            `</div>`
        );
    };

    renderer.code = (rawCode, language) => {
        let {attrs, code} = parseCode(rawCode);

        let filename = attrs.filename;

        code = highlight(code, language);

        return (
            `<div class="code-snippet">` +
            (filename != null ? `<div class="filename">${filename}</div>` : '') +
            `<pre class="language-${language}">` +
            `<code class="language-${language}">${code}</code>` +
            `</pre>` +
            `</div>`
        );
    };

    return renderer;
};

let parseMarkdown = (markdown) => {
    let refs = {
        title: null,
        description: null,
        headings: [],
        playgrounds: [],
    };

    marked.use({
        tokenizer: tokenizer,
        walkTokens: createWalkTokens(refs),
    });

    const markedOptions = {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        renderer: createRenderer(refs.headings),
    };

    let content = marked.marked(markdown, markedOptions);

    // Auto open the first files if no files open
    refs.playgrounds.forEach(({fileList}) => {
        if (fileList.length > 0) {
            if (fileList.every(file => !file.open)) {
                fileList[0].open = true;
            }
        }
    });

    return {...refs, content};
};

module.exports = {
    parseMarkdown,
};
