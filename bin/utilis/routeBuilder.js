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
exports.generateFolderRoute = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const path_1 = __importDefault(require("path"));
function generateFolderRoute(routeName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const upperName = routeName.charAt(0).toUpperCase() + routeName.slice(1);
            const lowerName = routeName.charAt(0).toLowerCase() + routeName.slice(1);
            const generateArr = [
                {
                    fileName: upperName + "Service.ts",
                    content: `import { Knex } from 'knex';
export class ${upperName}Service {
    constructor(private knex: Knex) {}
    async getUser(): Promise<object[]> {
        return await this.knex.select('*').from('users');
    }
}
`
                },
                {
                    fileName: upperName + "Controller.ts",
                    content: `import express from 'express';
import { ${upperName}Service } from './${upperName}Service';
    
export class ${upperName}Controller {
    constructor(private ${lowerName}Service: ${upperName}Service) {}
    
    login = async (req: express.Request, res: express.Response) => {
    
        try{
            let user = await this.${lowerName}Service.getUser();
            return res.status(200).json({ status: true, data: user })
        }
        catch(err:any){
            return res.status(200).json({ status: false })
        }
            
    };
    
}`
                },
                {
                    fileName: upperName + "Route.ts",
                    content: `import express from "express";
import { knex } from "../server"
    
import { ${upperName}Service } from './${upperName}Service';
import { ${upperName}Controller } from './${upperName}Controller';
    
const ${lowerName}Service = new ${upperName}Service(knex);
const ${lowerName}Controller = new ${upperName}Controller(${lowerName}Service);
    
export const ${lowerName}Router = express.Router();
    
${lowerName}Router.get('/login', ${lowerName}Controller.login);`
                }
            ];
            const dir = path_1.default.join(process.cwd(), `${routeName}Route`);
            const existsDir = util_1.default.promisify(fs_1.default.exists);
            const mkdirSync = util_1.default.promisify(fs_1.default.mkdir);
            const currentDirExist = yield existsDir(dir);
            if (!currentDirExist) {
                yield mkdirSync(dir);
                console.log(`Directory ${routeName}Route Created.`);
                console.log(`Remember to add the regarding route to route.ts!`);
            }
            for (let val of generateArr) {
                fs_1.default.writeFile(path_1.default.join(dir, val.fileName), val.content, (err) => {
                    if (err) {
                        console.log(err);
                        throw new Error("Error while creating files");
                    }
                    else {
                        console.log(`${val.fileName} written success.`);
                    }
                });
            }
        }
        catch (err) {
            console.log(err);
            return;
        }
    });
}
exports.generateFolderRoute = generateFolderRoute;
