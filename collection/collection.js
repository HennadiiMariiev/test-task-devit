//#region functions import
const make = require('../collection/functions/make.js');
const map = require('../collection/functions/map.js');
const every = require('../collection/functions/every.js');
const reduce = require('../collection/functions/reduce.js');
const filter = require('../collection/functions/filter.js');
const toJSON = require('../collection/functions/toJSON.js');
const toQueryString = require('../collection/functions/toQueryString.js');
const indexOf = require('../collection/functions/indexOf.js');
const isEmpty = require('../collection/functions/isEmpty.js');

const avg = require('../functions/array_avg.js');
const chunk = require('../functions/array_chunk.js');
const combine = require('../functions/array_combine.js');
const contains = require('../functions/array_contains.js');
const fill = require('../functions/array_fill.js');
const find = require('../functions/array_find.js');
const get = require('../functions/array_get.js');
const normalize = require('../functions/array_normalize.js');
const pluck = require('../functions/array_pluck.js');
const search = require('../functions/array_search.js');
const skipUntil = require('../functions/array_skip_until.js');
const unique = require('../functions/array_unique.js');

const sort = require('../collection/functions/sort.js');
const sortDesc = require('../collection/functions/sortDesc.js');
const sortBy = require('../collection/functions/sortBy.js');
const sortByDesc = require('../collection/functions/sortByDesc.js');

//#endregion 

//#region 
const testData = require('../data/data.js').testData;
const testData2 = require('../data/data.js').testData2;
const testData3 = require('../data/data.js').testData3;
const testData4 = require('../data/data.js').testData4;

const Pagination = require('../pagination/pagination.js');
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

Collection.sort = (arr, compareFunction = null) => new Collection(sort(arr, compareFunction));

Collection.sortDesc= (arr, compareFunction = null) => new Collection(sortDesc(arr, compareFunction));

Collection.sortBy = (arr, column, compareFunction = null) => new Collection(sortBy(arr, column, compareFunction));

Collection.sortByDesc = (arr, column, compareFunction = null) => new Collection(sortByDesc(arr, column, compareFunction));

Collection.paginate = (limit) => new Pagination(Collection.make(this.items), limit);
//#endregion

module.exports = Collection;