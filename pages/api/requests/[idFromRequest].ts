import { NextApiRequest, NextApiResponse } from 'next';
import {
  createNewRequest,
  deleteRequest,
  findRequestByUserIdDayAndTimeslot,
  getRequestsByUserId,
} from '../../../data/requests';

export type RegisterResponseBody = { error: string } | { requests: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  if (req.method === 'GET') {
    const requests = await getRequestsByUserId(req.query.idFromRequest);

    // console.log('requests', requests);

    return res.status(200).json({ requests: requests });
  } else {
    return res.status(401).json({
      error: 'Method not allowed',
    });
  }
}
