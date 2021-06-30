module.exports = function(arr, skipNaN = false) {
    let numbersCounter = arr.length;
    return [...arr].reduce((acc, el) => {
        if(skipNaN) {
            if(typeof el === 'number') {
                return acc += el;
            }
            return acc;
        } else if (typeof el === 'number' && !Number.isNaN(el)){
            return acc += el;
        }
        numbersCounter -= 1;
        return acc;
    }, 0) / numbersCounter;
}