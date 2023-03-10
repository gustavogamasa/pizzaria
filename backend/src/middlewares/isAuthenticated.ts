import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

    // Receive token
    const authToken = req.headers.authorization;

    if (!authToken) { return res.status(401).end; }

    const [, token] = authToken.split(" ");

    try {
        //validar
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        // Recover token ID and store it in user_id inside the request
        req.user_id = sub;
       

        return next();


    } catch (error) {
        return res.status(401).end();

    }
}

