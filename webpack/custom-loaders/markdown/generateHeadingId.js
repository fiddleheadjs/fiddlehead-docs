/**
 *
 * @param {string} text
 * @return {string}
 */
 function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/(\w)\'/g, '$1')           // Special case for apostrophes
        .replace(/[^a-z0-9_\-]+/g, '-')     // Replace all non-word chars with -
        .replace(/\-\-+/g, '-')             // Replace multiple - with single -
        .replace(/^-+/, '')                 // Trim - from start of text
        .replace(/-+$/, '');                // Trim - from end of text
}

/**
 *
 * @param {Array} headingChain
 * @returns {string}
 */
module.exports = function generateHeadingId(headingChain) {
    return headingChain.map(text => slugify(text)).join('.');
}
