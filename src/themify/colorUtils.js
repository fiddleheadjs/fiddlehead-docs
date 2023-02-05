let LessColor = require("less/lib/less/tree/color").default;
let blendFns = require("less/lib/less/functions/color-blending").default;
let colorFns = require("less/lib/less/functions/color").default;

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h, s, l){
    let r, g, b;

    if(s === 0){
        r = g = b = l; // achromatic
    }else {
        let hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max === min){
        h = s = 0; // achromatic
    }else{
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function parseColor(src) {
    if (src instanceof LessColor) {
        return src;
    }

    src = src.trim();

    try {
        if (src.startsWith('rgb')) {
            let value = src.replace(/[^\d|.]/g, ' ').split(' ').filter(t => t.trim()).map(t => parseInt(t));

            if (value.length > 3) {
                return new LessColor([value[0], value[1], value[2]], value[3]);
            }

            if (value.length === 3) {
                return new LessColor(value);
            }
        } else if (src.startsWith('hsl')) {
            let value = src.replace(/[^\d|.]/g, ' ').split(' ').filter(t => t.trim()).map(t => parseInt(t));

            if (value.length >= 3) {
                let rgb = hslToRgb(value[0] / 360, value[1] / 100, value[2] / 100);

                return new LessColor(rgb, value[3]);
            }
        }

        if (src.startsWith('#')) {
            if (src.length > 3) {
                return new LessColor(src.slice(1));
            }
        }

        return new LessColor([0, 0, 0], 0);

    } catch (e) {

        return new LessColor([0, 0, 0], 0);
    }
}

function colorToHEX(color) {
    return color.toRGB();
}

function colorToRGB(color) {
    return color.rgb.map(pad3).join(', ');
}

function colorToHSV(color) {
    let {h, s, v} = color.toHSV();

    let [H, S, V] = [h, s * 100, v * 100].map(pad3);

    return `${H}° ${S}% ${V}%`;
}

function colorToHSL(color) {
    let {h, s, l} = color.toHSL();

    let [H, S, L] = [h, s * 100, l * 100].map(pad3);

    return `${H}° ${S}% ${L}%`;
}

function colorToLuma(color) {
    return pad3(color.luma() * 100) + '%';
}

function colorToLuminance(color) {
    return pad3(colorFns.luminance(color).value) + '%';
}

function calcLuminance(color) {
    return colorFns.luminance(color).value;
}

function calcLuma(color) {
    return color.luma() * 100;
}

function calcGray(color) {
    return grayscale(color).rgb[0];
}

function calcLightness(color) {
    return color.toHSL().l * 100;
}

function grayscale(color) {
    return colorFns.greyscale(color);
}

function calcContrast(color1, color2) {
    let L1 = color1.luma();
    let L2 = color2.luma();

    if (L1 > L2) return (L1 + 0.05) / (L2 + 0.05);
    else return (L2 + 0.05) / (L1 + 0.05);
}

function hardlight(color1, color2) {
    return blendFns.hardlight(parseColor(color1), parseColor(color2));
}

function pad3(number) {
    number = Math.round(number);

    if (number < 10) {
        return `  ${number}`;
    }

    if (number < 100) {
        return ` ${number}`;
    }

    return number;
}

module.exports = {
    hslToRgb,
    rgbToHsl,
    parseColor,
    colorToHEX,
    colorToRGB,
    colorToHSV,
    colorToHSL,
    colorToLuma,
    colorToLuminance,
    calcLuminance,
    calcLuma,
    calcGray,
    calcLightness,
    calcContrast,
    hardlight,
};
