module.exports = function(keys, values) {  
    // compare 2 arrays length's and swapping it, if necessary
    if(keys.length < values.length) {
        [keys, values] = [values, keys];
    }

    return keys.reduce((acc, el, index) => {
        return {    ...acc,
                    [el]: values[index],
                }
    }, {});
}