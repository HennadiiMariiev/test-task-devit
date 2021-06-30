function array_search(arr, search, path = '') {

    // I f**k uped with this function))
    // It almost works. AMEN was really very fun))) 

    return arr.reduce((acc, el, index, array) => {
        if(el instanceof Object === false ) {      
            if(el.toString().match(search))  {
                acc.push([`[${index}]`, `${el}`]);            
            } 
            return acc;
        } else {
            const objArray = getItem(el, index);

            objArray.filter(item => item)
                    .forEach(item => {
                        acc.push([`${item.objIndex}`, `${item.obj}`]);
                    })
            return acc;
        }
    }, []);

    function getItem(obj, pathIndex) {

        if(Array.isArray(obj)) {
            return obj.map((el, index) => getItem(el, pathIndex + `${index}`));
        }

        return Object.keys(obj).reduce((acc, key) => {
            
            if(obj[key].toString().match(search)) {
                acc.push({obj: obj[key], objIndex: `[${pathIndex}].${key}`});
                return acc;
            }                
            return acc;
        }, []);
    }
}