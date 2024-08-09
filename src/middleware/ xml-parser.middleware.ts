import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as xml2js from 'xml2js';

@Injectable()
export class XmlParserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.is('application/xml')) {
      let data = '';
      req.setEncoding('utf8');
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        xml2js.parseString(data, { explicitArray: false }, (err, result) => {
          if (err) {
            return next(err);
          }
          req.body = result;
          next();
        });
      });
    } else {
      next();
    }
  }
}
