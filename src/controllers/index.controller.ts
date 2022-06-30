import { NextFunction, Request, Response } from 'express';
import EtoEncryption from '@utils/encryption'

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
  public encrypt = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const response = EtoEncryption.defaultEncrypt(req,res,next)
      console.log(response)
      res.send(response).status(200)
    } catch (error) {
      next(error);
    }
  };
  public decrypt = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const response =  EtoEncryption.defaultDecrypt(req,res,next)
      console.log(response)
      res.send(response).status(200)
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
