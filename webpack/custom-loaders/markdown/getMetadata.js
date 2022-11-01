let marked = require('marked');
let generateHeadingId = require('./generateHeadingId');

module.exports = function getMetadata(markdown) {
    let title = null;
    let description = null;
    let headings = [];
    let headingChain = [0, 0, 0, 0, 0, 0];

    marked.use({
        walkTokens(token) {
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
            }
        }
    });

    marked(markdown);

    return {title, description, headings};
}

