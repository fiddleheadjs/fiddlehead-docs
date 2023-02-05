const path = require('path');
const fs = require('fs');
const jsToJson = require('./jsToJson');
const jsToLess = require('./jsToLess');
const {hardlight, colorToHEX} = require('./colorUtils');
const args = process.argv.slice(2);

const dir = args[0] || '';
const sourcePath = path.resolve(dir, './srcVars.js');
const jsPath = path.resolve(dir, './vars.json');
const lessPath = path.resolve(dir, './vars.less');

const source = eval(fs.readFileSync(sourcePath, 'utf-8'));

let {gray, color} = source;
let srcGray = {...gray};
let srcColor = {...color};
for (let tone in srcGray) {
    if (srcGray.hasOwnProperty(tone) && !['white', 'black'].includes(tone)) {
        for (let hue in srcColor) {
            if (srcColor.hasOwnProperty(hue)) {
                color[`${hue}_${tone}`] = colorToHEX(hardlight(srcColor[hue], srcGray[tone])).toUpperCase();
            }
        }
    }
}

const jsonOutput = jsToJson(source);
const lessOutput = jsToLess(source);

fs.writeFileSync(jsPath, jsonOutput, 'utf8');
fs.writeFileSync(lessPath, lessOutput, 'utf8');
