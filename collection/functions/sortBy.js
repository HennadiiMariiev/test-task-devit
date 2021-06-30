module.exports = function(arr, column, compareFunction = null) {
    if(compareFunction) {
        try {
            return arr.sort(compareFunction);
        } catch(err) {
            return `Error! ${err}`;
        }
    } else {
        const prop = arr.find(item => {
            const values = Object.values(item);
            const innerObj = values.find(el => typeof el === 'object');
            if(innerObj) {
                return Object.keys(innerObj).find(key => key === column);
            }
            return Object.keys(item).find(key => key === column);
        });
        if(prop) {
            const propKey = Object.keys(prop);
    
            return arr.sort((a, b) => a[propKey] - b[propKey]);
        }
    }
    
    return [];
 }