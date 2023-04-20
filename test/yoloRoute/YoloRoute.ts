import express from "express";
import { knex } from "../server"
    
import { YoloService } from './YoloService';
import { YoloController } from './YoloController';
    
const yoloService = new YoloService(knex);
const yoloController = new YoloController(yoloService);
    
export const yoloRouter = express.Router();
    
yoloRouter.get('/login', yoloController.login);