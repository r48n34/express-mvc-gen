#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs/yargs"));
const routeBuilder_1 = require("./utilis/routeBuilder");
const parser = (0, yargs_1.default)(process.argv.slice(2)).options({
    n: {
        type: 'string',
        describe: 'route name',
        alias: 'name',
    },
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`express-mvc-gen`);
    const argv = yield parser.argv;
    const routeName = argv.n;
    if (routeName) {
        (0, routeBuilder_1.generateFolderRoute)(routeName);
    }
}))();
