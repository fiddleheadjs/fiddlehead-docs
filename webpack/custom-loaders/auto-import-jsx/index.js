module.exports = function (source) {
    return (
        `import {jsx} from 'fiddlehead';\n` +
        source
    );
};
