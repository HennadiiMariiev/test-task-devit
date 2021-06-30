module.exports = function(arr, compareFunction = null) {
    if(compareFunction) {
        try {
            return arr.sort(compareFunction);
        } catch(err) {
            return `Error! ${err}`;
        }
    }
    return arr.sort((a, b) => b - a);
 }