import express from 'express';
import fs from 'mz/fs';
import path from 'path';
import handlebars from 'handlebars';
import deepAssign from 'deep-assign';
import {version as APP_VERSION} from '../../package.json';
import yargs from 'yargs';
import imageSize from 'imagesize';
import Promise from 'bluebird';
import bodyParser from 'body-parser';

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
    app.use(bodyParser.json());
    app.get('/', (request, response) => {
        getImageSet(imageDir)
            .then((imageSet) => {
                return renderTemplate('index.html', {
                    initialState: new Buffer(JSON.stringify({
                        imageSet
                    })).toString('base64')
                });
            })
            .then((content) => response.type('text/html; charset=utf-8').send(content))
            .catch((error) => {
                response.status(500).json({error: error.message});
            });
    });
    app.post('/save', (request, response) => {
        fs.writeFile('.saved-state.json', JSON.stringify(request.body), (error) => {
            if (error) {
                console.error('Error saving state:', error);    // eslint-disable-line
                response.status(500).send('Error saving state');
            }
            else {
                console.log('Saved state'); // eslint-disable-line
                response.status(204).send();
            }
        });
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

/**
 * Return a disposer that will provide a readable stream for the specified
 * file path, and close the stream upon disposal.
 */
function getReadableStream(filePath) {
    return Promise.resolve(fs.createReadStream(filePath))
        .disposer((stream) => stream.close());
}

/**
 * Return a promise to get the dimensions of the image file.
 */
function getImageFileSize(filePath) {
    return Promise.using(getReadableStream(filePath), imageSizeAsPromised);
}

function getImageItem({dir, fileName, x, y}) {
    return getImageFileSize(path.join(dir, fileName))
        .catch((error) => {
            throw new Error(`Error getting image size for ${fileName}: ${error}`);
        })
        .timeout(1000, new Error(`Timedout getting image size for ${fileName}`))
        .then((dimensions) => {
            return {
                url: getImageFileUrl(fileName),
                pos: {
                    x,
                    y
                },
                selected: false,
                dims: {
                    orig: {
                        width: dimensions.width,
                        height: dimensions.height
                    },
                    display: getDisplayDimensions(dimensions)
                }
            };
        });
}

const maxWidth = 300;
const maxHeight = 200;

function getDisplayDimensions({width, height}) {
    const wscale = maxWidth / width;
    const hscale = maxHeight / height;
    const scale = Math.min(wscale, hscale);
    return {
        width: scale * width,
        height: scale * height
    };
}

function getImageSet(dir) {
    const initialSeparation = 30;
    const itemsPerColumn = 20;
    return fs.readdir(dir)
        .then((fileList) => {
            return Promise.all(fileList.map((fileName, idx) => {
                const x = (idx / itemsPerColumn) * maxWidth + initialSeparation;
                const y = (idx % itemsPerColumn) * initialSeparation;
                return getImageItem({dir, fileName, x, y});
            }));
        })
        .then((imageItemList) => {
            return imageItemList.reduce((imageSet, imageItem, idx) => {
                imageSet[`${idx}`] = imageItem;
                return imageSet;
            }, {});
        })
}
