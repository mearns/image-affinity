import express from 'express';
import fs from 'mz/fs';
import path from 'path';
import handlebars from 'handlebars';
import deepAssign from 'deep-assign';
import {version as APP_VERSION} from '../../package.json';
import yargs from 'yargs';

function renderTemplate(name, ctx={}) {
    const templatePath = path.resolve(__dirname, '..', 'templates', `${name}.hbs`)
    return fs.readFile(templatePath)
        .then((templateData) => {
            const template = handlebars.compile(String(templateData));
            return template(deepAssign({}, {APP_VERSION}, ctx));
        });
}

export function main () {

    const args = yargs
        .option('p', {
            alias: 'port',
            description: 'The port to bind to.',
            default: 8080,
            number: true,
            requiresArg: true
        })
        .option('h', {
            alias: 'host',
            description: 'The host to bind to.',
            default: '',
            string: true
        })
        .strict()
        .help()
        .argv;

    const app = express();
    app.get('/', (request, response) => {
        renderTemplate('index.html')
            .then((content) => response.type('text/html; charset=utf-8').send(content))
            .catch((error) => response.status(500).json(error));
    });
    app.use('/static/bundles/', express.static('./build/bundles/'));

    app.listen(args.port, args.host, () => {
        console.log(`Listening on ${args.host}:${args.port} ...`);  // eslint-disable-line
    })
}
