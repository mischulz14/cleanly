import { NextApiRequest, NextApiResponse } from 'next';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { name: string } };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  if (req.method === 'POST') {
    // Process a POST request
    // 1. make sure the data exists
    // 2. check if the user exists
    // 3. hash the password
    // 4. sql query to insert the user
    res.status(200).json({ user: { name: 'hi' } });
  } else {
    // Handle any other HTTP method

    res.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
