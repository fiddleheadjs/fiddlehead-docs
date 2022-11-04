const path = require('path');
const fs = require('fs');
const jsToLess = require('./jsToLess');
const args = process.argv.slice(2);

const dir = args[0] || '';
const sourcePath = path.resolve(dir, './vars.js');
const outputPath = path.resolve(dir, './vars.less');

const source = eval(fs.readFileSync(sourcePath, 'utf-8'));
const output = jsToLess(source);

fs.writeFileSync(outputPath, output, 'utf8');
