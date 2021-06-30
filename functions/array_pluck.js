module.exports = function(arr, path) {
    const pathArr = path.split('.');
    return arr.reduce((acc, el) => {
            const values = getPropertyRecursively(el, [...pathArr]);
            if(values.length !== 0) {
                acc.push(values);
            }
        return acc;
    }, []);

    function getPropertyRecursively(item, propPath) {
        if(propPath.length > 1) {
            const pathEl = propPath.splice(0, 1);

            return getPropertyRecursively(item[pathEl], propPath);
        } else {
            const lastEl = propPath.splice(0, 1);

            if(item[lastEl]) {
                return item[lastEl];
            }
        }

        return [];
    }
}