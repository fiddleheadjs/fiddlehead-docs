let getMetadata = require('./getMetadata');
let getContents = require('./getContents');

module.exports = function (source) {    
    let {title, description, headings} = getMetadata(source);
    let contents = getContents(source);

    return [
        `export let title = ${JSON.stringify(title, null, 4)};`,
        `export let description = ${JSON.stringify(description, null, 4)};`,
        `export let headings = ${JSON.stringify(headings, null, 4)};`,
        `export let contents = ${JSON.stringify(contents, null, 4)};`,
    ].join('\n\n');
};
