module.exports = function(arr) {
    if(arr) {
        return arr.join('');
    }
    return '[]';
}