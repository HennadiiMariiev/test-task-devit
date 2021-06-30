//import {testData, testData2, testData3, testData4} from './data.js';
const testData4 = require('./data/testData4.js');
// console.log(testData);
// console.log(testData2);
// console.log(testData3);
console.log(testData4);

// ========== TASK 1 (1бал)
// Сделать функцию поиска значений в массиве.

// Синтаксис: array_find(arr: array, search: string|regex): string|number[]|null
// Пример: 
// let result = array_find(testData, '/^raf.*/i') // ["Rafshan"]
// let result2 = array_find(testData, "Rafshan") // ["Rafshan"]

function array_find(arr, search) {
    return [...arr].find(el => el.toString().match(search)) || null;
}

// let result = array_find(testData, /^raf.*/i) // ["Rafshan"]
// let result2 = array_find(testData, "Rafshan") // ["Rafshan"]
// console.log(result);
// console.log(result2);


// =========== TASK 2 (1бал)
// Сделать функцию подсчета среднего значения, с возможностью исключения не числовых значений

// Синтаксис: array_avg(arr: array[, skipNaN: bool = false]): number
// Пример: 
// let result = array_avg(testData2) // ~265 
// let result2 = array_avg(testData) // ~420
// let result3 = array_avg(testData, true) // ~191

function array_avg(arr, skipNaN = false) {
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

// let result = array_avg(testData2) // ~265 
// let result2 = array_avg(testData) // ~420
// let result3 = array_avg(testData, true) // ~191

// console.log(result);
// console.log(result2);
// console.log(result3);


// 3 (1бал)
// Сделать функцию которая разбивает массив на подмассивы указанной длинны.

// Синтаксис: array_chunk(arr: array, count: number): any[]
// Пример: 
// let result = array_chunk(testData2, 2) // [[1, 2], [1990, 85], [24, 5], [7, 8.1]]

function array_chunk(arr, count) {
    // Variant 1
    return [...arr].reduce((acc, el, index, array) => {
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

// let result = array_chunk(testData2, 3) // [[1, 2], [1990, 85], [24, 5], [7, 8.1]]
// console.log(result);


// 4 (1бал)
// Сделать функцию которая обрезает массив до указанного значения.

function array_skip_until(arr, value) {
    const item = [...arr].findIndex(el => el === value);

    if(item !== -1) {
        return [...arr].splice(item, [...arr].length);
    }
    return [];
}

// Синтаксис: array_skip_until(arr: array, value: any): any[]
// Пример: 
// let result = array_skip_until(testData, 2) // [2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false]
// let result2 = array_skip_until(testData, "Rafshan") // ["Rafshan", "ashan@example.com", true, false]
// let result3 = array_skip_until(testData, "asd") // []

// console.log(result);
// console.log(result2);
// console.log(result3);



// 5 (1бал)
// Сделать функцию для проверки существования значения в не нормализированном списке данных.

function array_contains (arr, search) {
    return [...arr].some(el => {
        if(el instanceof Object) {
            return Object.values(el).some(item => item.toString().match(search))
        }
        return el.toString().match(search);
    });
}

// Синтаксис: array_contains(arr: array, search: string|regex): bool
// Пример: 
// let result = array_contains(testData4, /^raf.*/i) // true
// let result2 = array_contains(testData4, /^azaza.*/i) // false

// console.log(result);
// console.log(result2);

// 6 (1бал)
// Сделать функцию для получения данных с массивов по указанному пути (аминь).

function array_get(arr, path) {
    const pathArr = path.split(']')
                        .map(el => el.slice(1))
                        .filter(el => el)
                        .reverse();

    return getItemRecursivly(arr, pathArr);

    function getItemRecursivly(array, pathArr) {
        const searchIndex = pathArr.pop();

        if(pathArr.length === 1) {
            const firstEl = pathArr[0];
            if(array[searchIndex][firstEl]) {
                return array[searchIndex][firstEl];
            }
        } else {
            return getItemRecursivly([...array[searchIndex]], pathArr)
        }
    }
}
// Синтаксис: array_get(arr: array, path:string): any
// Пример:
let result = array_get(testData4, '[5].name') // "Rafshan"
let result2 = array_get(testData4, '[17][0][0][0][11][0]') // {name: "Rafshan", email: "rafshan@example.com", age: 11}
let result3 = array_get(testData4, '[17][0][0][0][11][0][name]') // "Rafshan"

console.log(result);
console.log(result2);
console.log(result3);

// 7 (1бал)
// Сделать функцию для поиска значений и пути к нему в не нормализированном списке данных (аминь).
function array_search(arr, search, path = '') {
    const result = [];
    let arrayByPath = path.length
        ? array_get(arr, path)
        : arr

    if (typeof arrayByPath === 'string' && arrayByPath.match(search)) {
        result.push({path: path, value: arrayByPath})
    } else if (typeof arrayByPath === 'object') {
        if (Array.isArray(arrayByPath) === false) {
            Object.entries(arrayByPath).map(([key, value]) => {
                const iterablePath = path
                    ? `${path}.${key}`
                    : `${key}`

                if (typeof value === 'object') array_search(arr, search, iterablePath).map(i => result.push(i))
                if (typeof value === 'string' && value.match(search)) result.push({path: iterablePath, value: value})
            })
        } else {
            arrayByPath.map((value, key) => {
                const iterablePath = path
                    ? `${path}[${key}]`
                    : `[${key}]`

                if (typeof value === 'object') array_search(arr, search, iterablePath).map(i => result.push(i))
                if (typeof value === 'string' && value.match(search)) result.push({path: iterablePath, value: value})
            })
        }
    }

    return result


    // return arr.reduce((acc, el, index, array) => {
    //     if(el instanceof Object === false ) {      
    //         if(el.toString().match(search))  {
    //             acc.push([`[${index}]`, `${el}`]);            
    //         } 
    //         return acc;
    //     } else {
    //         const objArray = getItemRecursivly(el, index);

    //         objArray.filter(item => item)
    //                 .forEach(item => {
    //                     acc.push([`${item.objIndex}`, `${item.obj}`]);
    //                 })
    //         return acc;
    //     }
    // }, []);

    // function getItemRecursivly(obj, pathIndex) {

    //     if(Array.isArray(obj)) {
    //         return obj.map((el, index) => getItemRecursivly(el, pathIndex + `${index}`));
    //     }

    //     return Object.keys(obj).reduce((acc, key) => {
            
    //         if(obj[key].toString().match(search)) {
    //             acc.push({obj: obj[key], objIndex: `[${pathIndex}].${key}`});
    //             return acc;
    //         }                
    //         return acc;
    //     }, []);
        
        //#region 
        // const objArr = Object.values(obj);
        // //console.log(objArr);
        // return objArr.filter((el, index) => {
        //     //console.log(el.toString().match(search));
        //     if(el.toString().match(search)) {
        //         const path = addIndexToPath(pathIndex, index);
        //         return {el, path};
        //     } else if(el instanceof Object) {
        //         if(el instanceof Array) {
        //             console.log('Obj: ', el.flat());
        //             return getItemRecursivly(el, index);
        //         }
        //         return getItemRecursivly(el, index);
        //     }
        // })
        //#endregion
    
}
// Синтаксис: array_search(arr: array, search: string|regex[, path:string = '']): [path: string, value: string|number][]
// Пример: 
// let result = array_search(testData4, /^raf.*/i) // [["[5].name", "Rafshan"], ["[13]", "Rafshan"], ["[17][0][0][0][7]", "Rafshan"], ["[17][0][0][0][11][0].name", "Rafshan"]]
// let result2 = array_search(testData4, /^raf.*/i, '[17][0][0][0]') // [["[17][0][0][0][7]", "Rafshan"], ["[17][0][0][0][11][0].name", "Rafshan"]]

// console.log(result);
// console.log(result2);

// 8 (1бал)
// Создать функцию которая создает объект на основании двух представленных массивов используя один как ключи, а другой как значения. Не подходящие ключи массивов должны быть исключены.
function array_combine(keys, values) {  
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
// Синтаксис: array_combine(keys: array, values: array): Object
// Пример: 
// let result = array_combine(testData, testData2) // {1: 1, 2: 2, 1990: 1990, 85: 85, 24: 24, "Vasya": 5, "colya@example.com": 7, "Rafshan": 8.1, "ashan@example.com": undefined}

// console.log(result);

// 9 (1бал)
// Создать функцию которая нормализует данные в массиве исключая или преобразуя не подходящие.

// Доступные шаблоны: 
// 'string' => строки, 
// 'number' => числа, 
// 'int' => целые числа, 
// 'float' => числа с плавающей точкой, 
// 'bool' => true | false, 
// 'function' => функция, 
// 'array' => массив, 
// Object => объект {name: 'string'}
// Синтаксис: array_normalize(arr: array, shema: string|Object[, transform: bool = false]): any[]

function array_normalize(arr, shema, transform = false) {
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

// Пример: 
// let result = array_normalize(testData4, 'string') // ['Vasya', 'colya@example.com', 'Rafshan', 'ashan@example.com']
// let result2 = array_normalize(testData4, 'string', true) // ['1', '2', '1990', '85', '24', 'Vasya', 'colya@example.com', 'Rafshan', 'ashan@example.com']
// let result3 = array_normalize(testData4, {age: 'float'}) // []
// let result4 = array_normalize(testData4, {age: 'float'}, true) // [{age: 20}, {age: 34}, {age: 46}, {age: 16}, {age: 99}, {age: 11}]

// let result5 = array_normalize(testData4, {name: 'string'}, true) // [{age: 20}, {age: 34}, {age: 46}, {age: 16}, {age: 99}, {age: 11}]


// console.log(result);
// console.log(result2);
// console.log(result3);
// console.log(result4);

// console.log(result5);

// 10 (1бал)
// Сделать функцию которая сможет делать срез данных с ассоциативного массива.

function array_pluck(arr, path) {
    const pathArr = path.split('.');
    return arr.reduce((acc, el) => {
            const values = getPropertyRecursivly(el, [...pathArr]);
            acc.push(values);
        return acc;
    }, []);

    function getPropertyRecursivly(item, propPath) {
        if(propPath.length > 1) {
            const pathEl = propPath.splice(0, 1);

            return getPropertyRecursivly(item[pathEl], propPath);
        } else {
            const lastEl = propPath.splice(0, 1);

            if(lastEl in item) {
                return item[lastEl];
            }
        }

        return [];
    }
}

// Синтаксис: array_pluck(arr: array, path: string): any[]
// Пример:
// let result = array_pluck(testData3, 'name') // ["Vasya", "Dima", "Colya", "Misha", "Ashan", "Rafshan"]
// let result2 = array_pluck(testData3, 'skills.php') // [0, 5, 8, 6, 0, 0]

// console.log(result);
// console.log(result2);


// 11 (1бал)
// Сделать функцию которая возвращает уникальные элементы массива.

function array_unique(arr) {
    // this returns the answer as in the example, 
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

// Синтаксис: array_unique(arr: array): any[]
// Пример:
// let result = array_unique(testData.concat(testData2)) // [1, 2, 1990, 85, 24, 5, 7, 8.1, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false]

// console.log(result);


// 12 (1бал)
// Сделать функцию которая создает массив указанной длинны и заполняет его переданными значениями.

function array_fill(length, value) {
    if(length <= 0) {
        return [];
    }

    return Array.from({length: length}, () => value);
}

// Синтаксис: array_fill(lenght: number, value: any): any[]
// Пример: 
// let result = array_fill(5, 'string') // ['string', 'string', 'string', 'string', 'string']

// console.log(result);


// 19 (1 бал)
// Вывести в консоль по 4 значения из переданного массива с интервалом в 2 секунды.

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, "Vasya", "|", "123", 9, 10, 11, 12, 13, 14, 15];

// printInInterval(arr);

// function printInInterval(arr) {
//     const printValues = printFourArrayValues(arr);
//     const timerId = setInterval(printValues, 2000);

//     function printFourArrayValues(array) {
//         const newArr = [...array];

//         return () => {
//             if(newArr.length === 0) {
//                 clearInterval(timerId);
//                 console.log('Interval was cleared.');
//                 return;
//             }
            
//             newArr.splice(0, 4).forEach(el => console.log(el));
//         };
//     }
// }