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
                const fileList = [];
                const regex = /\r?\n```(.*)\r?\n(?:\s*\/\*\*\s*filename="(.+)"\s*\*\/\s*\r?\n)?([\S\s]+?\r?\n)```\r?\n/gm;
                let match;

                while ((match = regex.exec(content)) !== null) {
                    const [ , language, filename, code] = match;

                    fileList.push({
                        filename,
                        language,
                        code,
                    });
                }

                return {
                    playground: {
                        fileList
                    }
                };
            }

            return content;
        })
        .filter(content => !(typeof content === 'string' && content.trim() === '')); // Remove empty lines
}
