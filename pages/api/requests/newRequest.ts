import { request } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { json } from 'stream/consumers';
import {
  availabilityAlreadyExists,
  createNewAvailability,
} from '../../../data/availabilities';
import {
  createNewRequest,
  findRequestByUserIdDayAndTimeslot,
} from '../../../data/requests';
import { timeslots } from '../../../data/timeslots';

export type RegisterResponseBody = { error: string } | { requests: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  if (req.method === 'POST') {
    // console.log(req.body.chosenTimeslots, 'request chosentimeslots');

    req.body.chosenTimeslots.forEach(async (timeslot: any) => {
      const requestAlreadyExists = await findRequestByUserIdDayAndTimeslot(
        req.body.userId,
        timeslot.day,
        timeslot.timeslot,
      );

      if (requestAlreadyExists) {
        return;
      } else {
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
      }
    });

    return res.status(200).json({ requests: 'created' });
  } else {
    return res.status(401).json({
      error: 'Method not allowed',
    });
  }
}
