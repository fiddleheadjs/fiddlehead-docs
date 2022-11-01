module.exports = function getContents(markdown) {
    return markdown
        .split(/^{{("(?:demo)":[^}]*)}}$/gm) // Split markdown into an array, separating demos
        .map((content) => {
            if (/^"(demo)": "(.*)"/.test(content)) {
                try {
                    return JSON.parse(`{${content}}`);
                } catch (err) {
                    console.error('JSON.parse fails with: ', `{${content}}`);
                    console.error(err);
                    return ''; // Empty lines will be ignored
                }
            }

            return content;
        })
        .filter(content => !(typeof content === 'string' && content.trim() === '')); // Remove empty lines
}
