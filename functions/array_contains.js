module.exports = function(arr, search) {
    return [...arr].some(el => {
        if(el instanceof Object) {
            return Object.values(el).some(item => item.toString().match(search))
        }
        return el.toString().match(search);
    });
}