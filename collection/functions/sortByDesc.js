module.exports = function(arr, column, compareFunction = null) {
    if(compareFunction) {
        try {
            return arr.sort(compareFunction);
        } catch(err) {
            return `Error! ${err}`;
        }
    }
    const prop = arr.find(item => Object.keys(item).find(key => key === column));

    if(prop) {
        const propKey = Object.keys(prop);
        return arr.sort((a, b) => b[propKey] - a[propKey]);
    }
    return [];
 }