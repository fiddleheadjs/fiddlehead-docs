let fs = require('fs');
let path = require('path');
let getContents = require('./getContents');
let getMetadata = require('./getMetadata');

module.exports = function (source) {
    let contents = getContents(source);

    let demoIds = [];
    let demoPaths = {};
    let demoCodes = {};

    contents.forEach(content => {
        if (typeof content === 'string') {
            return;
        }

        let demoId = content.demo;
        let filePath = path.join(path.dirname(this.resourcePath), demoId + '.js');

        demoIds.push(demoId);
        demoPaths[demoId] = filePath.split(path.sep).join('/');
        demoCodes[demoId] = fs.readFileSync(filePath, 'utf-8');

        // If a loader uses external resources (i.e. by reading from filesystem), they must indicate it.
        // This information is used to invalidate cacheable loaders and recompile in watch mode.
        // https://webpack.js.org/contribute/writing-a-loader/#loader-dependencies
        this.addDependency(filePath);
    });

    let {title, description, headings} = getMetadata(source);

    return [
        // Import demo components
        demoIds.map(id =>
            `import ${id} from '${demoPaths[id]}';`
        ).join('\n'),

        // Export demos: Array.<{ Component, code }>
        `export let demos = {${demoIds.map(id =>
            `${id}: { Component: ${id}, code: ${JSON.stringify(demoCodes[id])} },`
        ).join('\n')}};`,

        // Export ...
        `export let title = ${JSON.stringify(title, null, 4)};`,
        `export let description = ${JSON.stringify(description, null, 4)};`,
        `export let headings = ${JSON.stringify(headings, null, 4)};`,
        `export let contents = ${JSON.stringify(contents, null, 4)};`,
    ].join('\n\n');
};
