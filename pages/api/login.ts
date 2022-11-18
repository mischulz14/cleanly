import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
// login api route
import { NextApiRequest, NextApiResponse } from 'next';
import { createSession } from '../../data/sessions';
import { getUserByEmail } from '../../data/users';
import {
  createSerializedRegisterSessionTokenCookie,
  createUserIdCookie,
} from '../../utils/cookies';

export type LoginResponseBody =
  | { errors: { message: string }[] }
  | { user: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponseBody>,
) {
  if (req.method === 'POST') {
    // Process a POST request
    // 1. make sure the data exists
    if (
      typeof req.body.email !== 'string' ||
      typeof req.body.password !== 'string' ||
      !req.body.email ||
      !req.body.password
    ) {
      return res.status(400).json({
        errors: [{ message: 'Email and password are required' }],
      });
    }
    // 2. check if the user exists
    const user = await getUserByEmail(req.body.email);
    // console.log(user);

    // if the user doesn't exists, return an error
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            message: 'Email not correct',
          },
        ],
      });
    }

    // 3. compare the password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.passwordHash,
    );

    // if the password doesn't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({
        errors: [
          {
            message: 'Password is incorrect',
          },
        ],
      });
    }

    // 4. CREATE A SESSION

    // 4.1 create a session token
    const token = crypto.randomBytes(80).toString('base64');

    // 4.2 store the session token in the database
    const session = await createSession(user.id, token);
    // 4.3 set cookie
    const serializedCookie = createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    const userIdCookie = createUserIdCookie(user.id.toString());

    res
      .status(200)
      .setHeader('Set-Cookie', [serializedCookie, userIdCookie])
      .json({
        user: {
          name: user.email,
          role: user.role,
          id: user.id,
        },
      });
  } else {
    // Handle any other HTTP method
    res.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
