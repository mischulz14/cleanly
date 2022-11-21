import { NextApiRequest, NextApiResponse } from 'next';
import { updateService } from '../../../data/services';
import { updateUser } from '../../../data/users';
import { selectAllServices } from '../../../data/usersServicesRelations';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { services: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  if (req.method === 'GET') {
    const allServices = await selectAllServices();

    return res.status(200).json({ services: allServices });
  } else {
    return res.status(400).json({
      errors: [{ message: 'Method not allowed' }],
    });
  }
}
