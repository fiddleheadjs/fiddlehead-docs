module.exports = function getContents(markdown) {
    return markdown
        // Split markdown into an array, separating demos
        .split(/^{{("demo":[^}]*)}}$|^(<playground>[\S\s]*<\/playground>)$/gm)
        .map((content) => {
            if (content === undefined) {
                // Should not undefined
                return '';
            }

            if (/^"demo": "(.*)"/.test(content)) {
                try {
                    return JSON.parse(`{${content}}`);
                } catch (err) {
                    console.error('JSON.parse fails with: ', `{${content}}`);
                    console.error(err);
                    return ''; // Empty lines will be ignored
                }
            }
            
            if (/^<playground>[\S\s]*<\/playground>$/.test(content)) {
                const modules = [];
                const regex = /\n```(.*)\n(?:\/\/\s*data-file="(.+)"\s*\n)?([\S\s]+?)\n```\n/gm;
                let match;

                while ((match = regex.exec(content)) !== null) {
                    const [ , language, filename, code] = match;

                    modules.push({
                        language,
                        filename,
                        code,
                    });
                }

                return {
                    playground: {
                        modules
                    }
                };
            }

            return content;
        })
        .filter(content => !(typeof content === 'string' && content.trim() === '')); // Remove empty lines
}
