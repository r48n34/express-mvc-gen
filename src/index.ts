#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { generateFolderRoute } from './utilis/routeBuilder';

const parser = yargs(process.argv.slice(2)).options({
    n: {
        type: 'string',
        describe: 'route name',
        alias: 'name',
    },
});

(async () => {
    console.log(`express-mvc-gen`);
    const argv = await parser.argv;

    const routeName = argv.n;

    if (routeName) {
        generateFolderRoute(routeName);
    }

})();
