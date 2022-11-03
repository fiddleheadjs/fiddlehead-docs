let fs = require('fs');
let path = require('path');

let scanDir = (relativePath, rootPath) => {
    let absolutePath = path.resolve(rootPath, relativePath);

    if (!fs.lstatSync(absolutePath).isDirectory()) {
        return relativePath.split(path.sep).join('/');
    }

    let files = fs.readdirSync(absolutePath).map(fname => {
        let fpath = path.join(relativePath, fname);
        return scanDir(fpath, rootPath);
    });

    return [relativePath.split(path.sep).join('/'), files];
};

module.exports = function (relativePath) {
    let sourcePath = path.resolve(path.dirname(this.resourcePath), relativePath.trim());
    
    let [, output] = scanDir('', sourcePath);

    return 'export default ' + JSON.stringify(output) + ';';
};
