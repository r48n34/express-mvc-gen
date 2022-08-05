import fs from 'fs';
import util from 'util';
import path from 'path';

export async function generateFolderRoute(routeName : string){

    try{

        const upperName = routeName.charAt(0).toUpperCase() + routeName.slice(1);
        const lowerName = routeName.charAt(0).toLowerCase() + routeName.slice(1);

        const generateArr = [
    {
        fileName: upperName + "Service.ts",
        content: 
`import { Knex } from 'knex';
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
        content: 
`import express from 'express';
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
        content: 
`import express from "express";
import { knex } from "../server"
    
import { ${upperName}Service } from './${upperName}Service';
import { ${upperName}Controller } from './${upperName}Controller';
    
const ${lowerName}Service = new ${upperName}Service(knex);
const ${lowerName}Controller = new ${upperName}Controller(${lowerName}Service);
    
export const ${lowerName}Router = express.Router();
    
${lowerName}Router.get('/login', ${lowerName}Controller.login);`
    }]

        const dir = __dirname + `/${routeName}Route`;
        console.log(dir)

        const existsDir = util.promisify(fs.exists);
        const mkdirSync = util.promisify(fs.mkdir);
    
        const currentDirExist = await existsDir(dir);
        if (!currentDirExist) {
            await mkdirSync(dir);
            console.log(`Directory ${routeName}Route Created.`);
            console.log(`Remember to add the regarding route to route.ts!`);
        }
    
        for(let val of generateArr){
            fs.writeFile( path.join(dir, val.fileName) , val.content, (err) => {
                if (err){
                    console.log(err);
                    throw new Error("Error while creating files");
                }
                else {
                    console.log(`${val.fileName} written success.`);
                }
             });
        }
    
    }
    catch(err:any){
        console.log(err);
        return;
    }
}

