module.exports = function jsToJson(source) {
    let output = {};
    
    for (let type in source) {
        if (source.hasOwnProperty(type) && !type.startsWith('$')) {
            output[type] = source[type];
        }
    }

    return JSON.stringify(output, null, 2);
};
