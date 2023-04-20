"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"generateFolderRoute",{enumerable:true,get:function(){return generateFolderRoute}});const _fs=_interop_require_default(require("fs"));const _path=_interop_require_default(require("path"));const _kolorist=require("kolorist");function _interop_require_default(obj){return obj&&obj.__esModule?obj:{default:obj}}function generateFolderRoute(routeName){try{if(!routeName){throw new Error("Missing file name")}const upperName=routeName.charAt(0).toUpperCase()+routeName.slice(1);const lowerName=routeName.charAt(0).toLowerCase()+routeName.slice(1);const generateArr=[{fileName:upperName+"Service.ts",content:`import { Knex } from 'knex';

export class ${upperName}Service {
    constructor(private knex: Knex) {}
    
    async getUser(): Promise<object[]> {
        return await this.knex.select('*').from('users');
    }
}
`},{fileName:upperName+"Controller.ts",content:`import express from 'express';
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
    
}`},{fileName:upperName+"Route.ts",content:`import express from "express";
import { knex } from "../server"
    
import { ${upperName}Service } from './${upperName}Service';
import { ${upperName}Controller } from './${upperName}Controller';
    
const ${lowerName}Service = new ${upperName}Service(knex);
const ${lowerName}Controller = new ${upperName}Controller(${lowerName}Service);
    
export const ${lowerName}Router = express.Router();
    
${lowerName}Router.get('/login', ${lowerName}Controller.login);`}];const dir=_path.default.join(process.cwd(),`${routeName}Route`);const currentDirExist=_fs.default.existsSync(dir);if(!currentDirExist){_fs.default.mkdirSync(dir);console.log((0,_kolorist.cyan)(`Directory ${routeName}Route Created.`));console.log((0,_kolorist.cyan)(`Remember to add the regarding route to route.ts!
`))}else{throw new Error("Folder already exist.")}for(let val of generateArr){try{const filePath=_path.default.join(dir,val.fileName);_fs.default.writeFileSync(filePath,val.content);console.log((0,_kolorist.yellow)(val.fileName),(0,_kolorist.green)("success to create in"),(0,_kolorist.yellow)(filePath))}catch(error){console.log(`Error while creating ${val.fileName}`)}}}catch(err){console.log((0,_kolorist.lightRed)(err));return}}