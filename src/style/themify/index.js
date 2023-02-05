const path = require('path');
const fs = require('fs');
const jsToJson = require('./jsToJson');
const jsToLess = require('./jsToLess');
const {hardlight, colorToHEX} = require('./colorUtils');
const args = process.argv.slice(2);

const dir = args[0] || '';
const sourcePath = path.resolve(dir, './vars_src.js');
const jsPath = path.resolve(dir, './vars.json');
const lessPath = path.resolve(dir, './vars.less');

const source = eval(fs.readFileSync(sourcePath, 'utf-8'));

let {gray, color} = source;
let gray_src = {...gray};
let color_src = {...color};
for (let tone in gray_src) {
    if (gray_src.hasOwnProperty(tone) && !['white', 'black'].includes(tone)) {
        for (let hue in color_src) {
            if (color_src.hasOwnProperty(hue)) {
                color[`${hue}_${tone}`] = colorToHEX(hardlight(color_src[hue], gray_src[tone])).toUpperCase();
            }
        }
    }
}

const jsonOutput = jsToJson(source);
const lessOutput = jsToLess(source);

fs.writeFileSync(jsPath, jsonOutput, 'utf8');
fs.writeFileSync(lessPath, lessOutput, 'utf8');
