//#region functions import
const make = require('./functions/make.js');
const map = require('./functions/map.js');
const every = require('./functions/every.js');
const reduce = require('./functions/reduce.js');
const filter = require('./functions/filter.js');
const toJSON = require('./functions/toJSON.js');
const toQueryString = require('./functions/toQueryString.js');
const indexOf = require('./functions/indexOf.js');
const isEmpty = require('./functions/isEmpty.js');

const avg = require('./functions/array_avg.js');
const chunk = require('./functions/array_chunk.js');
const combine = require('./functions/array_combine.js');
const contains = require('./functions/array_contains.js');
const fill = require('./functions/array_fill.js');
const find = require('./functions/array_find.js');
const get = require('./functions/array_get.js');
const normalize = require('./functions/array_normalize.js');
const pluck = require('./functions/array_pluck.js');
const search = require('./functions/array_search.js');
const skipUntil = require('./functions/array_skip_until.js');
const unique = require('./functions/array_unique.js');

const sort = require('./functions/sort.js');
const sortDesc = require('./functions/sortDesc.js');
const sortBy = require('./functions/sortBy.js');
const sortByDesc = require('./functions/sortByDesc.js');

//#endregion 

//#region 
const testData = require('./data/data.js').testData;
const testData2 = require('./data/data.js').testData2;
const testData3 = require('./data/data.js').testData3;
const testData4 = require('./data/data.js').testData4;

//#endregion

//#region Collection function and prototype
function Collection(arr) {
    if(!Array.isArray(arr)) {
        return "Data is not array!";
    }

    this.items = arr;

    Object.defineProperty(this, 'length', {
        value: arr.length,
        enumerable: false,
        writable: false,
    });
}

Collection.prototype.make = function(arr) {
    return make(arr);
}

Collection.prototype.map = function(callback) {
    return new Collection(map(this.items, callback));
}

Collection.prototype.reduce = function(callback, initial = null) {
    return reduce(this.items, callback, initial);
}

Collection.prototype.filter = function(callback) {
    return new Collection(filter(this.items, callback));
}

Collection.prototype.indexOf = function(searchElement, fromIndex = 0) {
    return indexOf(this.items, searchElement, fromIndex);
}

Collection.prototype.every = function(callback) {
    return every(this.items, callback);
}

Collection.prototype.toJSON = function() {
    return toJSON(this.items);
}

Collection.prototype.values = function() {
    return Object.values(this.items);
}

Collection.prototype.toQueryString = function() {
    return toQueryString(this.items);
}

Collection.prototype.isEmpty = function() {
    return isEmpty(this.items);
}

Collection.prototype.sanitize = function(callback) {
    return new Collection(sanitize(this.items, callback));
}

Collection.prototype.transform = function(callback) {
    return new Collection(transform(this.items, callback));
}

Collection.prototype.avg = function(skipNaN = false) {
    return avg(this.items, skipNaN);
}

Collection.prototype.chunk = function(count) {
    return new Collection(chunk(this.items, count));
}

Collection.prototype.contains = function(search) {
    return contains(this.items, search);
}

Collection.prototype.skipUntil = function(value) {
    return new Collection(skipUntil(this.items, value));
}

Collection.prototype.get = function(path) {
    return get(this.items, path);
}

Collection.prototype.normalize = function(shema, transform = false) {
    return new Collection(normalize(this.items, shema, transform));
}

Collection.prototype.pluck = function(path) {
    return new Collection(pluck(this.items, path));
}

Collection.prototype.unique = function() {
    return new Collection(unique(this.items));
}

Collection.prototype.fill = function(length, value) {
    return new Collection(fill(length, value));
}

Collection.prototype.sort = function(compareFunction = null) {
    return new Collection(sort(this.items, compareFunction));
}

Collection.prototype.sortDesc = function(compareFunction = null) {
    return new Collection(sortDesc(this.items, compareFunction));
}

Collection.prototype.sortBy = function(column, compareFunction = null) {
    return new Collection(sortBy(this.items, column, compareFunction));
}

Collection.prototype.sortByDesc = function(column, compareFunction = null) {
    return new Collection(sortByDesc(this.items, column, compareFunction));
}

Collection.prototype.paginate = function(limit) {
    return new Pagination(this, limit);
}
//#endregion

//#region Collection static methods
Collection.map = (arr, callback) => new Collection(map(arr, callback));
Collection.make = arr => new Collection(make(arr));
Collection.filter = (arr, callback) => new Collection(filter(arr, callback));
Collection.every = (arr, callback) => every(arr, callback);
Collection.reduce = (arr, callback, initial = null) => reduce(arr, callback, initial);
Collection.indexOf = (arr, searchElement, fromIndex = 0) => indexOf(arr, searchElement, fromIndex);
Collection.toJSON = arr => toJSON(arr);
Collection.toQueryString = arr => toQueryString(arr);
Collection.isEmpty = (arr) => isEmpty(arr);

Collection.find = (arr, search) => new Collection(find(arr, search)); 
Collection.avg = (arr, skipNaN = false) => avg(arr, skipNaN);
Collection.chunk = (arr, count) => new Collection(chunk(arr, count));
Collection.skipUntil = (arr, value) => new Collection(skipUntil(arr, value));
Collection.contains = (arr, search) => contains(arr, search);
Collection.get = (arr, path) => get(arr, path);
Collection.normalize = (arr, schema, transform = false) => new Collection(normalize(arr, schema, transform));
Collection.pluck = (arr, path) => new Collection(pluck(arr, path));
Collection.unique = (arr) => new Collection(unique(arr));
Collection.fill = (lenght, value)=> new Collection(fill(lenght, value));

Collection.sort = (arr, compareFunction = null) => new Collection(sort(arr, compareFunction)); //: Collection
Collection.sortDesc= (arr, compareFunction = null) => new Collection(sortDesc(arr, compareFunction));// Collection
Collection.sortBy = (arr, column, compareFunction = null) => new Collection(sortBy(arr, column, compareFunction)); // Collection
Collection.sortByDesc = (arr, column, compareFunction = null) => new Collection(sortByDesc(arr, column, compareFunction));

Collection.paginate = (limit) => new Pagination(Collection.make(this.items), limit);
//#endregion

//#region PAGINATION
function Pagination(collection, limit) {
    this.collection = collection;
    this.limit = limit;
    this.currentPage = 1;
    this._cursor = this.currentPage;
    this.maxPageCount = Math.ceil(this.collection.length / this.limit);

    Object.defineProperty(this, 'cursor', {
        enumerable: false,

        get: function() {
            return this._cursor;
        },
        set: function(value) {
            if(value && value > this.maxPageCount) {
                this._cursor = this.maxPageCount;
            } else if(value && value < 1) {
                this._cursor = 1;
            } else if(value){
                this._cursor = value;
            }
          },
    });

    return this;
}

Pagination.prototype.page = function(page) {
    if(page > 0 && page <= this.maxPageCount) {
        this.currentPage = page;
    } else {
        throw `Invalid value page = ${page}.`;
    }

    const leftLimit = this.currentPage * this.limit + 1 - this.limit;
    const rigthLimit = leftLimit + this.limit - 1 >= this.collection.length
                                    ? this.collection.length
                                    : leftLimit + this.limit - 1;
    const buffer = Collection.make(this.collection.items.slice(leftLimit - 1, rigthLimit));

    return buffer;
}

Pagination.prototype.paginate = function(limit) {
    if(limit >= 1) {
        this.limit = limit;
    }

    return this;
}

Pagination.prototype.count = function() {
        return Math.ceil(this.collection.length / this.limit);
}

Pagination.prototype.current = function() {
    this.currentPage = this.cursor;

    return this.page(this.currentPage);
}

Pagination.prototype.next = function() {
    this.cursor = this.currentPage + 1;

    return this.page(this.cursor);
}

Pagination.prototype.prev = function() {
    this.cursor = this.currentPage - 1;

    return this.page(this.cursor);
}

Pagination.prototype.first = function() {
    this._cursor = 1;
    return this.page(this._cursor);
}

Pagination.prototype.last = function() {
    this.cursor = Math.ceil(this.collection.length / this.limit);

    return this.page(this.cursor);
}

Pagination.prototype.reset = function() {
    this.cursor = 1;
}

Pagination.make = (collection, limit) => {
    return new Pagination(collection, limit);
};

// console.log(Pagination.make(Collection.make([1, 2, 3, 4, 5, 6]), 5).page(2).values()); // [6]
// let objPagination = Pagination.make(Collection.make([1, 2, 3, 4, 5, 6]), 5);
// console.log(objPagination.page(2).values()); // [6]
// console.log(objPagination.paginate(2).page(2)); // [2]
// console.log(objPagination.page(2).values()); // [6]

// console.log(Collection.make([1, 2, 3, 4, 5, 6]).paginate(5).page(2).values()); // [6]
// console.log(Collection.make([1, 2, 3, 4, 5, 6]).paginate(5) instanceof Pagination);
// console.log(Pagination.make(Collection.make([1, 2, 3, 4, 5, 6]), 5).paginate(3).count());

// let objPagination = Collection.make([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).paginate(3);
// console.log(objPagination.current().values()); // [1]
// objPagination.next();
// objPagination.next();
// console.log(objPagination.current().values()); // [4]
// console.log(objPagination.cursor); // 4
// objPagination.reset();
// console.log(objPagination.current().values()); // [1]
// console.log(objPagination.cursor); // 4


//#endregion 

let numbers = Collection.make([1, 2, 3, 4]);
let arr = [1, 3, 6, 2, 4, 5];

// console.log('numbers chain: ', numbers.map(item => item * 2).filter(item => item > 2).toJSON()) // "[4,6,8]"
// console.log('Collection.reduce: ', Collection.reduce(arr, (acc, el) => acc + el));

// console.log(Collection.make(arr).sort().values());
// console.log(Collection.make(arr).sortDesc().values());
// console.log(Collection.make([{age: 1}, {age: 10}, {age: 4}, {age: 60}]).sortBy('age').values());

//#region TASK 20
console.log(Collection.make(testData4).pluck('name').values());
//#endregion

//#region TASK 21
function getDevsWithSkillsSorted() {
    const skills = Collection.make(testData3).pluck('skills').values();
    const skillNames = Object.keys(skills[0]);
    
    for(const skillName of skillNames) {
        const tempArr = Collection.make(testData3)
                                .reduce((res, dev) => {
                                    res.push({ name: dev.name, 
                                            skill: dev.skills[skillName] });
                                    return res;
                                }, []);    
        console.log(`====== ${skillName} ======`);
        tempArr.sort(compareFunc)
                .map((dev, index) => console.log(`${index + 1}. ${dev.name} - ${dev.skill}`)); 
        console.log();        
    }
}

function compareFunc(a, b) {
    return b.skill - a.skill;
}

getDevsWithSkillsSorted();
//#endregion

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

// console.log(toPagination([1,2], 1).first().toJSON()); //"[1]"
// console.log(toPagination(Collection.make([1, 2]), 1).first().toJSON()); //"[1]"
// console.log(toPagination(false, 1).first().toJSON()); //"[false]"
// console.log(toPagination(false, true, 1, 2, 10).first().toJSON()); //"[false,true,1,2]"
//#endregion
