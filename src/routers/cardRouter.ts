import { Router } from "express";

const cardRouter = Router();

cardRouter.post("/card", ()=> console.log('sim'));

export default cardRouter;
