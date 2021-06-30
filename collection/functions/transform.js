module.exports = function(arr, callback) {
    const newArray = [];

    for(let i = 0; i < arr[i]; i += 1) {
        newArray.push(callback(arr[i]));
    }
    
    return newArray;
}