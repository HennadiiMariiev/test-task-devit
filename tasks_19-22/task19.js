let arr = [1, 2, 3, 4, 5, 6, 7, 8, "Vasya", "|", "123", 9, 10, 11, 12, 13, 14, 15];

printInInterval(arr);

function printInInterval(arr) {
    const TIME_INTERVAL = 2000;
    const printValues = printFourArrayValues(arr);
    const timerId = setInterval(printValues, TIME_INTERVAL);

    function printFourArrayValues(array) {
        const newArr = [...array];

        return () => {
            if(newArr.length === 0) {
                clearInterval(timerId);
                console.log('Interval was cleared.');
                return;
            }
    
            newArr.splice(0, 4).forEach(el => console.log(el));
        };
    }
}