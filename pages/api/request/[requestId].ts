import { NextApiRequest, NextApiResponse } from 'next';
import {
  findAvailabilityByDayAndServiceId,
  updateTimeslotStatus,
} from '../../../data/availabilities';
import { updateRequest } from '../../../data/requests';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    // Process a POST request
    console.log(req.body);

    const updatedRequest = await updateRequest(
      req.body.status,
      req.body.requestId,
    );

    console.log('updatedRequest', updatedRequest);
    console.log('updated request status', updatedRequest?.status);

    const foundAvailability = await findAvailabilityByDayAndServiceId(
      updatedRequest?.day,
      updatedRequest?.serviceId,
    );

    console.log('foundAvailability', foundAvailability);
    console.log('found availability timeslots', foundAvailability?.timeslots);
    console.log('found availability id', foundAvailability?.id);

    if (updatedRequest?.status === 'accepted') {
      const updatedTimeslot = await updateTimeslotStatus(
        foundAvailability.id,
        updatedRequest?.timeslots,
      );

      console.log('updatedTimeslot', updatedTimeslot);
    }

    res.status(200).json({ requests: 'created' });
  } else {
    // Handle any other HTTP method
    res.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
