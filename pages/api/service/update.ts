import { NextApiRequest, NextApiResponse } from 'next';
import { updateService } from '../../../data/services';
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
      const updatedUser = await updateUser(
        req.body.userId,
        req.body.lastName,
        req.body.email,
      );

      console.log(req.body.serviceId, 'serviceId');

      const updatedService = await updateService(
        req.body.serviceId,
        req.body.price,
        req.body.description,
        req.body.district,
      );

      console.log(updatedService, 'updatedService');

      return res.status(200).json({ user: updatedService });
    }
  }
}
