import { NextApiRequest, NextApiResponse } from 'next';
import {
  createNewRequest,
  deleteRequest,
  findRequestByUserIdDayAndTimeslot,
} from '../../../data/requests';

export type RegisterResponseBody = { error: string } | { requests: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  if (req.method === 'DELETE') {
    console.log(req.body);

    const deletedRequest = await deleteRequest(req.body.requestId);

    console.log('deletedRequest', deletedRequest);

    return res.status(200).json({ requests: deletedRequest });
  } else {
    return res.status(401).json({
      error: 'Method not allowed',
    });
  }
}
