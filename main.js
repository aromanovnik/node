/***
 * LESSON 2
 */
// «час-день-месяц-год»
const dates = process.argv.slice(2);

const EventEmitter = require('events');
const emitter = new EventEmitter();

const emitterTypes = {
    show: 'show',
    end: 'end',
}


// hour-day-month-year
class Timer {
    constructor(hour, day, month, year) {
        this.endDate = new Date(year, month, day, hour);
        this.interval = setInterval(() => {
            const now = new Date();
            if (now >= this.endDate) {
                clearInterval(this.interval);
                emitter.emit(emitterTypes.end, this.endDate);
                return;
            }

            const timeDiff = Math.abs(this.endDate.getTime() - now.getTime());
            const diffHour = Math.ceil(timeDiff / (1000 * 3600));

            emitter.emit(emitterTypes.show, diffHour);
        }, 1000);
    }
}

class Handler {
    static show(payload) {
        console.log(payload, ' hours left');
    }

    static end(payload) {
        console.log('END: ', payload);
    }
}

const run = () => {
    if (!dates?.length) {
        console.log('Date not set!')
        return;
    }

    for (let i = 0; i < dates.length; i++) {
        const [hour, day, month, year] = dates[i].split('-');
        if (hour && day && month && year) {
            new Timer(hour, day, month, year)
        }
    }
}

run();

emitter.on(emitterTypes.show, Handler.show);
emitter.on(emitterTypes.end, Handler.end);
// emitter.set('error', console.log);


/***
 * LESSON 1
 * ***/
// const colors = require('colors');
// const [minimal, maximum] = process.argv.slice(2);
// let [min, max] = [+minimal, +maximum];
//
// console.log('Lesson 1');
//
// const getNumbers = (_min, _max) => {
//     const numbers = [];
//
//     if (isNaN(_min) || isNaN(_max)) {
//         console.error('Error: Not a number!'.red);
//         process.exit();
//         return;
//     }
//     if (_min < 2) {
//         _min = 2;
//     }
//
//     nextPrime:
//         for (let i = _min; i <= _max; i++) {
//             for (let j = 2; j < i; j++) {
//                 if (i % j === 0) continue nextPrime;
//             }
//             numbers.push(i);
//         }
//
//
//     return numbers;
// }
//
// const displayNumbers = (_numbers) => {
//     if (!_numbers.length) {
//         console.error('Message: No prime number!'.red);
//         process.exit();
//         return;
//     }
//
//     const _clrs = [
//         'green',
//         'yellow',
//         'red',
//     ];
//     let _clrsIndex = 0;
//     for (let i = 0; i < _numbers.length; i++) {
//         console.log(colors[_clrs[_clrsIndex]](_numbers[i]));
//         _clrsIndex = _clrs[_clrsIndex + 1] ? _clrsIndex + 1 : 0;
//     }
// }
//
// const numbers = getNumbers(min, max);
// displayNumbers(numbers);



