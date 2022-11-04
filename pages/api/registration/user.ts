import bcrypt from 'bcrypt';
import { request } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getUserByEmail } from '../../../data/users';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
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

    // if the user exists, return an error
    if (userExists) {
      return res.status(401).json({
        errors: [
          { message: 'User already exists or email address is already in use' },
        ],
      });
    }
    // 3. hash the password
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    // 4. sql query to insert the user
    const createdUser = await createUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      passwordHash,
      'user',
      new Date(),
    );

    console.log(createdUser);

    res.status(200).json({
      user: {
        name: createdUser.email,
      },
    });
  } else {
    // Handle any other HTTP method
    res.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
