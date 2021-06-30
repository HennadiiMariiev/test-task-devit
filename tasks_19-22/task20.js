const Collection = require('../collection/collection.js');
const testData4 = require('../data/data.js').testData4;

//#region TASK 20
console.log(Collection.make(testData4).pluck('name').values());
//#endregion