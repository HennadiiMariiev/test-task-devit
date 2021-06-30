module.exports = function(arr, callback) {
    const newArray = [];

    for(let i = 0; i < arr[i]; i += 1) {
        if(callback(arr[i])) {
            newArray.push(callback(arr[i]));
        }
    }
    
    return newArray;
}