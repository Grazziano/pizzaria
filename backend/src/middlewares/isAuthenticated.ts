import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // console.log('Chamou esse middleware!');
  // Receber o token
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }
  // console.log(authToken);

  const [, token] = authToken.split(' ');

  try {
    // validar esse token
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
    // console.log(sub);

    // recuperar o id do token e colocar dentro de uma variavel user_id dentro do request
    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).end();
  }

  next();
}
