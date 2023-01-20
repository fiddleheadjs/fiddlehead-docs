module.exports = function (htmlCode) {
    return 'export default ' + JSON.stringify(htmlCode) + ';';
};
