module.exports = function(arr, callback) {
    for(let i = 0; i < arr.length; i += 1) {
        if(callback(arr[i], i) === false) {
            return false;
        }
    }

    return true;
}