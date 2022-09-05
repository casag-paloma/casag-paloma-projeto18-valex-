import { NextFunction, Request, Response } from "express";

export default function errorHandler (error: any, req: Request, res: Response, next: NextFunction) {
  console.log(error);
  if(error.type === "error_not_found") {
    return res.status(404).send(error.message)
  }

  if(error.type === "error_bad_request") {
    return res.status(400).send(error.message)
  }

  if(error.type === "error_conflict") {
    return res.status(409).send(error.message)
  }
  
  res.sendStatus(500); // internal server error
}
