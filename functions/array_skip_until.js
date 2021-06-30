module.exports = function(arr, value) {
    const item = [...arr].findIndex(el => el === value);

    if(item !== -1) {
        return [...arr].splice(item, [...arr].length);
    }
    return [];
}