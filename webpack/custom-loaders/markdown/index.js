let {parseMarkdown} = require('./parseMarkdown');

module.exports = function (source) {    
    let {title, description, headings, playgrounds, content} = parseMarkdown(source);

    return [
        `export let title = ${JSON.stringify(title, null, 4)};`,
        `export let description = ${JSON.stringify(description, null, 4)};`,
        `export let headings = ${JSON.stringify(headings, null, 4)};`,
        `export let playgrounds = ${JSON.stringify(playgrounds, null, 4)};`,
        `export let content = ${JSON.stringify(content, null, 4)};`,
    ].join('\n\n');
};
