const Pagination = require('../pagination/pagination.js');
const Collection = require('../collection/collection.js');

//#region TASK 22 toPagination
function toPagination(data, limit) {
    if(arguments.length > 2) {
        const argsForCollection = [...arguments].slice(0, arguments.length - 1);
        const limitValue = [...arguments][arguments.length - 1];

        if(argsForCollection && typeof limitValue === 'number' && limitValue >= 1) {
            return new Pagination(Collection.make([...argsForCollection]), limitValue);
        }
    }

    if(data !== undefined && typeof limit === 'number' && limit >= 1) {
        if(data instanceof Collection) {
            return new Pagination(data, limit);
        }

        return new Pagination(Collection.make(data), limit);
    }
}

console.log(toPagination([1,2], 1).first().toJSON()); //"[1]"
console.log(toPagination(Collection.make([1, 2]), 1).first().toJSON()); //"[1]"
console.log(toPagination(false, 1).first().toJSON()); //"[false]"
console.log(toPagination(false, true, 1, 2, 10).first().toJSON()); //"[false,true,1,2]"

//#endregion