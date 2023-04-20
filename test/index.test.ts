import path from "path";
import fs from "fs";
import { rimrafSync } from 'rimraf'

import { generateFolderRoute } from '../src/utilis/routeBuilder';

test('generateFolderRoute to works normal', () => {

    const routeName = "Pears"
    const exceptArray = ["PearsService.ts", "PearsController.ts", "PearsRoute.ts"];

    generateFolderRoute(routeName);
    const listDir = fs.readdirSync(path.join(process.cwd(), routeName + "Route"))

    exceptArray.forEach( v => expect(listDir).toContain(v));
    rimrafSync("PearsRoute")

})

test('generateFolderRoute to works normal also with small letters', () => {

    const routeName = "apple"
    const exceptArray = ["AppleController.ts", "AppleController.ts", "AppleRoute.ts"];

    generateFolderRoute(routeName);
    const listDir = fs.readdirSync(path.join(process.cwd(), routeName + "Route"))

    exceptArray.forEach( v => expect(listDir).toContain(v));
    rimrafSync("appleRoute")

})

test('generateFolderRoute to works with no file name', () => {

    const routeName = ""

    generateFolderRoute(routeName);
    const listDir = fs.readdirSync(process.cwd())

    expect(listDir).not.toContain("Route")
    

})