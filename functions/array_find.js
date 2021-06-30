module.exports = function(arr, search) {
    return [...arr].find(el => el.toString().match(search)) || null;
}