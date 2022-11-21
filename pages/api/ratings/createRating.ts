import { NextApiRequest, NextApiResponse } from 'next';
import { createNewRating } from '../../../data/ratings';

export type RegisterResponseBody = { errormessage: string } | { rating: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  if (req.method === 'POST') {
    const createdRating = await createNewRating(
      req.body.serviceId,
      req.body.rating,
    );

    console.log('createdRating', createdRating);

    return res.status(200).json({ rating: createdRating });
  } else {
    return res.status(400).json({
      errormessage: 'Method not allowed',
    });
  }
}
