module.exports = function(arr, callback) {
    const newArray = [];

    for(let i = 0; i < arr.length; i += 1) {
        if(callback(arr[i], i) === true) {
            newArray.push(arr[i]);
        }
    }

    return newArray;
}