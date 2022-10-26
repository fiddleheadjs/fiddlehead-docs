const fs = require('fs');
const path = require('path');
const getContents = require('./getContents');
const getMetadata = require('./getMetadata');

module.exports = function (source) {
    const contents = getContents(source);

    const demoIds = [];
    const demoPaths = {};
    const demoCodes = {};

    contents.forEach(content => {
        if (typeof content === 'string') {
            return;
        }

        const demoId = content.demo;
        const filePath = path.join(path.dirname(this.resourcePath), demoId + '.js');

        demoIds.push(demoId);
        demoPaths[demoId] = filePath.split(path.sep).join('/');
        demoCodes[demoId] = fs.readFileSync(filePath, 'utf-8');

        // If a loader uses external resources (i.e. by reading from filesystem), they must indicate it.
        // This information is used to invalidate cacheable loaders and recompile in watch mode.
        // https://webpack.js.org/contribute/writing-a-loader/#loader-dependencies
        this.addDependency(filePath);
    });

    const {title, description, headings} = getMetadata(source);

    return [
        // Import demo components
        demoIds.map(id =>
            `import ${id} from '${demoPaths[id]}';`
        ).join('\n'),

        // Export demos: Array.<{ Component, code }>
        `export const demos = {${demoIds.map(id =>
            `${id}: { Component: ${id}, code: ${JSON.stringify(demoCodes[id])} },`
        ).join('\n')}};`,

        // Export ...
        `export const title = ${JSON.stringify(title, null, 4)};`,
        `export const description = ${JSON.stringify(description, null, 4)};`,
        `export const headings = ${JSON.stringify(headings, null, 4)};`,
        `export const contents = ${JSON.stringify(contents, null, 4)};`,
    ].join('\n\n');
}
