import { request } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { json } from 'stream/consumers';
import {
  availabilityAlreadyExists,
  createNewAvailability,
} from '../../data/availabilities';
import { createNewRequest } from '../../data/requests';
import { timeslots } from '../../data/timeslots';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { requests: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  if (req.method === 'POST') {
    console.log(req.body);

    if (
      req.body.chosenAvailabilities === undefined ||
      req.body.chosenAvailabilities.length === 0
    ) {
      return res.status(401).json({
        errors: [
          {
            message: 'Please choose at least one availability',
          },
        ],
      });
    } else {
      req.body.chosenTimeslots.forEach(async (timeslot: any) => {
        const createdRequest = await createNewRequest(
          req.body.userId,
          req.body.serviceId,
          timeslot.timeslot,
          timeslot.day,
          req.body.serviceName,
          req.body.serviceEmail,
          req.body.userName,
          'pending',
        );

        console.log(createdRequest);
      });

      res.status(200).json({ requests: 'created' });
    }
  } else {
    return res.status(401).json({
      errors: [
        {
          message: 'Method not allowed',
        },
      ],
    });
  }
}
