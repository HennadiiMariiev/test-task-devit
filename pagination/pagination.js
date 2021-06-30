const Collection = require('../collection/collection.js');

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

//#endregion 

module.exports = Pagination;