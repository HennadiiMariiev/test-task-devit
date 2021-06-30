module.exports = function(arr) {
    return '[' + arr.map(el=> el).join(',') + ']';

    // another variant
    // return '[' + arr.map((el, index) => {
    //     return `${index}:${el}`;
    // }).join(',') + ']';
}