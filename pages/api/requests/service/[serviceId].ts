import { NextApiRequest, NextApiResponse } from 'next';
import {
  createNewRequest,
  deleteRequest,
  findRequestByUserIdDayAndTimeslot,
  getRequestsByServiceId,
} from '../../../../data/requests';

export type RegisterResponseBody = { error: string } | { requests: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  if (req.method === 'GET') {
    const requests = await getRequestsByServiceId(req.query.serviceId);

    // console.log('requests', requests);

    return res.status(200).json({ requests: requests });
  } else {
    return res.status(401).json({
      error: 'Method not allowed',
    });
  }
}
