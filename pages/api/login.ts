import bcrypt from 'bcrypt';
// login api route
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByEmail } from '../../data/users';

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
    const userExists = await getUserByEmail(req.body.email);
    console.log(userExists);

    // if the user doesn't exists, return an error
    if (!userExists) {
      return res.status(401).json({
        errors: [
          {
            message: 'User not found',
          },
        ],
      });
    }

    // 3. compare the password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      userExists.passwordHash,
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

    // 4. create a session
    // 5. return the user

    res.status(200).json({
      user: {
        name: userExists.email,
        role: userExists.role,
        id: userExists.id,
      },
    });
  } else {
    // Handle any other HTTP method
    res.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
