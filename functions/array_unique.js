module.exports = function(arr) {
    // this returns same answer as in the example, 
    // but it`s not unique elements for both arrays

    // return [...new Set(arr)];

    // function below returns exactly unique elements for both arrays
    return [...arr].reduce((acc, el, index, array) => {
        const lastIndex = array.lastIndexOf(el);
        if(index !== lastIndex) {
            array[lastIndex] = null;
            el = null;
        } else if(el !== null) {
            acc.push(el);
        }

        return acc;
    }, []);
}