import express from 'express';
import fs from 'mz/fs';
import path from 'path';
import handlebars from 'handlebars';
import deepAssign from 'deep-assign';
import {version as APP_VERSION} from '../../package.json';
import yargs from 'yargs';
import imageSize from 'image-size';
import Promise from 'bluebird';

function renderTemplate(name, ctx={}) {
    const templatePath = path.resolve(__dirname, '..', 'templates', `${name}.hbs`)
    return fs.readFile(templatePath)
        .then((templateData) => {
            const template = handlebars.compile(String(templateData));
            return template(deepAssign({}, {APP_VERSION}, ctx));
        });
}

const IMAGE_BASE_URL = '/static/images';

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
        .option('i', {
            alias: 'image-dir',
            description: 'The path to the directory of images.',
            demand: true,
            requiresArg: true,
            path: true
        })
        .strict()
        .help()
        .argv;

    const imageDir = args['image-dir'];

    const app = express();
    app.get('/', (request, response) => {
        getImageList(imageDir)
            .then((imageList) => {
                return renderTemplate('index.html', {
                    props: new Buffer(JSON.stringify({
                        imageList
                    })).toString('base64')
                });
            })
            .then((content) => response.type('text/html; charset=utf-8').send(content))
            .catch((error) => response.status(500).json(error));
    });
    app.use('/static/bundles/', express.static('./build/bundles/'));
    app.use(IMAGE_BASE_URL, express.static(imageDir));

    app.listen(args.port, args.host, () => {
        console.log(`Listening on ${args.host}:${args.port} ...`);  // eslint-disable-line
    })
}

function getImageFileUrl(fileName) {
    return `${IMAGE_BASE_URL}/${fileName}`;
}

const imageSizeAsPromised = Promise.promisify(imageSize);

function getImageItem(dir, fileName) {
    return imageSizeAsPromised(path.join(dir, fileName))
        .then(({width, height}) => {
            return {
                url: getImageFileUrl(fileName),
                dimensions: {
                    width,
                    height
                }
            };
        });
}

function getImageList(dir) {
    return fs.readdir(dir)
        .then((imageList) => {
            return Promise.all(imageList.map((fileName) => getImageItem(dir, fileName)));
        });
}
