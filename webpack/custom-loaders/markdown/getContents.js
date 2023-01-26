module.exports = function getContents(markdown) {
    return markdown
        // Split markdown into an array, separating demos
        .split(/^{{("demo":[^}]*)}}$|^(<playground>[\S\s]*?<\/playground>)$/gm)
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

                    // Empty lines will be ignored
                    return '';
                }
            }

            if (/^<playground>[\S\s]*?<\/playground>$/.test(content)) {
                const fileList = [];
                const regex = /\r?\n```(.*)\r?\n(?:\s*\/\*\*\s*(.+)\s*\*\/\s*\r?\n)?([\S\s]+?)\s*```\r?\n/gm;
                let match;

                while ((match = regex.exec(content)) !== null) {
                    const [, language, attrsString, code] = match;

                    const attrs = {};
                    const attrRegex = /(?:\s|^)([\w-]+)(?:\s*=\s*"\s*(.*?)\s*")?/g;
                    let attrMatch;

                    while ((attrMatch = attrRegex.exec(attrsString)) !== null) {
                        let [, attrName, attrValue] = attrMatch;
                        attrs[attrName] = attrValue;
                    }

                    fileList.push({
                        filename: attrs['filename'],
                        open: attrs.hasOwnProperty('open'),
                        language,
                        code,
                    });
                }

                if (fileList.length === 0) {
                    // Empty lines will be ignored
                    return '';
                }

                if (fileList.every(file => !file.open)) {
                    fileList[0].open = true;
                }

                return {
                    playground: {
                        fileList
                    }
                };
            }

            return content;
        })
        // Remove empty lines
        .filter(content => !(typeof content === 'string' && content.trim() === ''));
}
