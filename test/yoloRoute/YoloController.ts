import express from 'express';
import { YoloService } from './YoloService';
    
export class YoloController {
    constructor(private yoloService: YoloService) {}
    
    login = async (req: express.Request, res: express.Response) => {
    
        try{
            let user = await this.yoloService.getUser();
            return res.status(200).json({ status: true, data: user })
        }
        catch(err:any){
            return res.status(200).json({ status: false })
        }
            
    };
    
}