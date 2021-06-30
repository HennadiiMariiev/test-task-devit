module.exports = function(arr, searchElement, fromIndex = 0) {
    for(let i = fromIndex || 0; i < arr.length; i += 1) {
        if(arr[i] == searchElement) {
            return i;
        }
    }

    return -1;
}