module.exports = function(length, value) {
    if(length <= 0) {
        return [];
    }

    return Array.from({length: length}, () => value);
}