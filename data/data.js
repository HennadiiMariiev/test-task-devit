let testData = [1, 2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false];
let testData2 = [1, 2, 1990, 85, 24, 5, 7, 8.1];
let testData3 = [
	{
		name: "Vasya",
		email: "vasya@example.com",
		age: 20,
		skills: {
			php: 0,
			js: -1,
			madness: 10,
			rage: 10
		}
	},
	{
		name: "Dima",
		email: "dima@example.com",
		age: 34,
		skills: {
			php: 5,
			js: 7,
			madness: 3,
			rage: 2
		}
	},
	{
		name: "Colya",
		email: "colya@example.com",
		age: 46,
		skills: {
			php: 8,
			js: -2,
			madness: 1,
			rage: 4
		}
	},
	{
		name: "Misha",
		email: "misha@example.com",
		age: 16,
		skills: {
			php: 6,
			js: 6,
			madness: 5,
			rage: 2
		}
	},
	{
		name: "Ashan",
		email: "ashan@example.com",
		age: 99,
		skills: {
			php: 0,
			js: 10,
			madness: 10,
			rage: 1
		}
	},
	{
		name: "Rafshan",
		email: "rafshan@example.com",
		age: 11,
		skills: {
			php: 0,
			js: 0,
			madness: 0,
			rage: 10
		}
	},
]
let testData4 = [
	{
		name: "Vasya",
		email: "vasya@example.com",
		age: 20,
	},
	{
		name: "Dima",
		email: "dima@example.com",
		age: 34,
	},
	{
		name: "Colya",
		email: "colya@example.com",
		age: 46,
	},
	{
		name: "Misha",
		email: "misha@example.com",
		age: 16,
	},
	{
		name: "Ashan",
		email: "ashan@example.com",
		age: 99,
	},
	{
		name: "Rafshan",
		email: "rafshan@example.com",
		age: 11,
	},
	1, 2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false,
	[[[[1, 2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false, [{
		name: "Rafshan",
		email: "rafshan@example.com",
		age: 11,
	}]]]]]
]

module.exports = {testData, testData2, testData3, testData4};