import { NextApiRequest, NextApiResponse } from 'next';
import { updateUser, updateUserImage } from '../../../data/users';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  if (req.method === 'PUT') {
    if (typeof req.body.image !== 'string') {
      return res.status(400).json({
        errors: [{ message: 'Email is not a string' }],
      });
    } else {
      // update the user
      const updatedUserImage = await updateUserImage(
        req.body.userId,
        req.body.image,
      );

      // console.log('updatedUserImage', updatedUserImage);

      return res.status(200).json({ user: updatedUserImage });
    }
  } else {
    return res.status(400).json({
      errors: [{ message: 'Method not allowed' }],
    });
  }
}
