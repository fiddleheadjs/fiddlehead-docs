let parseAttrs = (attrsString) => {
    let attrs = {};
    let regex = /(?:\s|^)([\w-]+)(?:\s*=\s*"\s*(.*?)\s*")?/g;
    let match;

    while ((match = regex.exec(attrsString)) !== null) {
        let [, attrName, attrValue] = match;
        attrs[attrName] = attrValue;
    }

    return attrs;
};

let parseCode = (code) => {
    let attrs = {};
        
    // Pattern: /** options go here */
    let match = code.match(/^\s*\/\*\*\s*(.*?)\s*\*\/\s*\r?\n/);
    if (match !== null) {
        attrs = parseAttrs(match[1]);
        code = code.substring(match[0].length);
    }

    code = code.replace(/\s+$/, '');

    return {attrs, code};
};

module.exports = {
    parseAttrs,
    parseCode,
};
