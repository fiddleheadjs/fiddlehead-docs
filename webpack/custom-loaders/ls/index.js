const fs = require('fs');
const path = require('path');

module.exports = function (source) {
    return 'export default ' + JSON.stringify(
        fs.readdirSync(
            path.resolve(path.dirname(this.resourcePath), source.trim())
        ).map(file => {
            return path.basename(file);
        })
    ) + ';';
};
