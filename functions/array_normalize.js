module.exports = function(arr, shema, transform = false) {
    let newArr = [...arr];

    if(shema instanceof Object) {
        if(transform) {
            newArr = arrayItemToObjectTransform(newArr);
        }
        return filterArrayOfObjects(newArr);
    } else {
        if(transform) {
            newArr = arrayTransform(newArr, shema);
        }      
        return filterArrayOfPrimitives(newArr);
    }

    function arrayTransform(array, shema) {
        return array.map(el => {
            if(el instanceof Object === false) {
                switch (shema) {
                    case 'string':
                        return el.toString();
                    break;
                    case 'number', 'int':
                        return Number.parseInt(el);
                    break;
                    case 'float':
                        return Number.parseFloat(el);
                    break;
                    case 'boolean':
                        return Boolean(el);
                    break;
                    case 'array':
                        return [el];
                    break;
                }
            }
        });
    }

    function arrayItemToObjectTransform(array) {
        return array.reduce((acc, el) => {
            const keys = Object.keys(el);
            const shemaKey = Object.keys(shema);

            if(keys.find(key => key === shemaKey.toString())) {
                acc.push({ [shemaKey.toString()]: el[shemaKey]});
            }

            return acc;
        }, []);

    }

    function filterArrayOfPrimitives(array) {
        switch (shema) {
            case 'string':
            case 'number':
            case 'int':
            case 'function':
                return array.filter(el => typeof el === shema);
            break;

            case 'float':
                return array.filter(el => typeof el === 'number' && Math.floor(el) !== el);
            break;

            case 'bool':
                return array.filter(el => typeof el === 'boolean');
            break;

            case 'array':
                return array.filter(el => el instanceof Array);
            break;
        }
    }

    function filterArrayOfObjects(array) {
        switch (Object.values(shema).toString()) {
            case 'string':
            case 'number':
            case 'int':
            case 'function':
                return array.filter(obj => 
                    Object.values(obj).filter(el => typeof el === Object.values(shema).toString()));
            break;

            case 'float':
                const shemaKey = Object.keys(shema);
                if(array.every(item => typeof item[shemaKey] === 'number')) {
                    return array.filter(item => typeof item[shemaKey] === 'number') || [];
                }
                return [];
            break;

            case 'bool':
                return array.filter(obj => 
                    Object.values(obj).filter(el => typeof el === 'boolean'));
            break;

            case 'array':
                return array.filter(obj => 
                    Object.values(obj).filter(el => el instanceof Array));
            break;
        }
    }
}