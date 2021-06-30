module.exports = function(arr) {
    const args = [...arguments];

    if(typeof arr === 'boolean') {
        return [arr];
    }

    if(args.length > 1) {
        const newArr = [];
        for(let i = 0; i < args.length; i += 1) {
            newArr.push(args[i]);
        }
        //console.log(...newArr);

        return newArr;
    } else if(args.length === 1) {
        return arr;
    }

    return [];
}