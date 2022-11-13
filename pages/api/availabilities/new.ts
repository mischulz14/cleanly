import { request } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { json } from 'stream/consumers';
import {
  availabilityAlreadyExists,
  createNewAvailability,
} from '../../../data/availabilities';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { availabilities: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  if (req.method === 'POST') {
    // Process a POST request

    const createdAvailability = req.body.chosenAvailabilities.forEach(
      async (availability: any) => {
        // if not create a new availability
        createNewAvailability(
          req.body.serviceId,
          availability.day,
          availability.timeslots,
        );
      },
    );
    res.status(200).json({ availabilities: createdAvailability });
  } else {
    // Handle any other HTTP method
    res.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
