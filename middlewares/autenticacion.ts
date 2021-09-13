import { Response, Request, NextFunction } from 'express';
import { decode } from 'jsonwebtoken';
import Token from '../clases/token';


export const verificaToken = (req: any, res: Response, next: NextFunction ) => {
    
    const userToken = req.get('x-token') || '';
    Token.comprobarToken(userToken)
        .then((decoded: any) => {
            console.log('Decoded', decoded);
            req.usuario = decoded.usuario;
            next();
        })
        .catch( err => {
            res.json({
                ok: false,
                mensaje: 'El Token no es correcto'
            })
        })
}