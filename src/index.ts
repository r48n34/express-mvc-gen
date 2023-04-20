#!/usr/bin/env node

import minimist from 'minimist'
import { generateFolderRoute } from './utilis/routeBuilder';

interface InputArg {
    n?: string, // template
    name?: string
}

(async () => {
    console.log(`express-mvc-gen`);
    const args = minimist<InputArg>(process.argv.slice(2), { string: ['_'] });

    const routeName = args.n || args.name || null

    if (routeName) {
        generateFolderRoute(routeName);
    }

})();
