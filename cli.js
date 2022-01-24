const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const inquirer = require('inquirer');


const options = yargs
    .usage('Usage: -p <path to the file>')
    .option('p', {
        alias: 'path',
        describe: 'Path to the file',
        type: 'string',
        demandOption: false,
    })
    .option('s', {
        alias: 'search',
        describe: 'Search text or pattern',
        type: 'string',
        demandOption: false,
    }).argv;


const showList = (_path, _search) => {
    console.log('Path: ', _path);

    const fileList = fs.readdirSync(_path);
    inquirer.prompt([
        {
            name: 'fileName',
            type: 'list', // input, number, confirm, list, checkbox, password
            message: 'Выберите файл для поиска',
            choices: fileList,
        }
    ]).then(({ fileName }) => {
        const fullPath = path.join(_path, fileName);
        if (fs.lstatSync(fullPath).isDirectory()) {
            showList(fullPath, _search);
            return;
        }

        const data = fs.readFileSync(fullPath, 'utf-8');
        if (!_search) {
            console.log(data);
            return;
        }

        const index = data.search(_search);
        if (index < 0) {
            console.log('Not found');
            return;
        }

        const line = data.slice(0, index).split('\n').length;
        console.log('Found! \n Line: ', line);
    });
}

console.log(options);
const filePath = options.p ?? './';
const search = options.s;
const fullPath = path.resolve(__dirname, filePath);

showList(fullPath, search);


