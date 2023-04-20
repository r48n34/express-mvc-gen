import fs from 'fs';
import path from 'path';
import { cyan, green, lightRed, yellow } from "kolorist";

export function generateFolderRoute(routeName : string){

    try{

        if(!routeName){
            throw new Error("Missing file name");
        }

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

        const dir = path.join(process.cwd(), `${routeName}Route`);

        const currentDirExist = fs.existsSync(dir);
        if (!currentDirExist) {
            fs.mkdirSync(dir);
            console.log(cyan(`Directory ${routeName}Route Created.`));
            console.log(cyan(`Remember to add the regarding route to route.ts!\n`));
        }
        else{
            throw new Error("Folder already exist.")
        }
    
        for(let val of generateArr){
            try {
                const filePath = path.join(dir, val.fileName);

                fs.writeFileSync( filePath, val.content );
                console.log(yellow(val.fileName), green("success to create in"), yellow(filePath) );
            } 
            catch (error) {
                console.log(`Error while creating ${val.fileName}`);
            }
        }
    
    }
    catch(err:any){
        console.log(lightRed(err));
        return;
    }
}

