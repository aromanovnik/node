const colors = require('colors');
const [minimal, maximum] = process.argv.slice(2);
let [min, max] = [+minimal, +maximum];

console.log('Lesson 1');

const getNumbers = (_min, _max) => {
    const numbers = [];

    if (isNaN(_min) || isNaN(_max)) {
        console.error('Error: Not a number!'.red);
        process.exit();
        return;
    }
    if (_min < 2) {
        _min = 2;
    }

    nextPrime:
        for (let i = _min; i <= _max; i++) {
            for (let j = 2; j < i; j++) {
                if (i % j === 0) continue nextPrime;
            }
            numbers.push(i);
        }


    return numbers;
}

const displayNumbers = (_numbers) => {
    if (!_numbers.length) {
        console.error('Message: No prime number!'.red);
        process.exit();
        return;
    }

    const _clrs = [
        'green',
        'yellow',
        'red',
    ];
    let _clrsIndex = 0;
    for (let i = 0; i < _numbers.length; i++) {
        console.log(colors[_clrs[_clrsIndex]](_numbers[i]));
        _clrsIndex = _clrs[_clrsIndex + 1] ? _clrsIndex + 1 : 0;
    }
}

const numbers = getNumbers(min, max);
displayNumbers(numbers);



