module.exports = function(arr, callback, initial = null) {
    let acc = initial;

    for(let i = 0; i < arr.length; i += 1) {
        acc = callback(acc, arr[i]);
    }

    return acc;
}