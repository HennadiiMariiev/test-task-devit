module.exports = function(arr, path) {
    const pathArr = path.split(']')
                        .map(el => el.slice(1))
                        .filter(el => el)
                        .reverse();

    return getItemRecursivly(arr, pathArr);

    function getItemRecursivly(array, pathArr) {
        const searchIndex = pathArr.pop();

        if(pathArr.length === 1) {
            return array[searchIndex][pathArr[0]];
        } else {
            return getItemRecursivly([...array[searchIndex]], pathArr)
        }
    }
}