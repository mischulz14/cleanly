import { NextApiRequest, NextApiResponse } from 'next';
import { updateUser } from '../../../data/users';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  if (req.method === 'PUT') {
    if (typeof req.body.email !== 'string' || !req.body.email) {
      return res.status(400).json({
        errors: [{ message: 'Email is not a string' }],
      });
    } else {
      // update the user
      const updatedUser = updateUser(
        req.body.id,
        req.body.lastName,
        req.body.email,
      );

      return res.status(200).json({ user: updatedUser });
    }
  }
}
