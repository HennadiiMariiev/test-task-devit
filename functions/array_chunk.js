module.exports = function(arr, count) {
    // Variant 1
    return [...arr].reduce((acc) => {
                        acc.push(arr.splice(0, count));
                        return acc;
                    }, [])
                    .filter(subArr => subArr.length !== 0);

    // Variant 2
    // const newArr = [];

    // while(arr.length) {
    //     newArr.push(arr.splice(0, count));
    // }

    // return newArr;
}