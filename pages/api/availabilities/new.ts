import { request } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { json } from 'stream/consumers';
import {
  availabilityAlreadyExists,
  createNewAvailability,
} from '../../../data/availabilities';
import { timeslots } from '../../../data/timeslots';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { availabilities: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  if (req.method === 'POST') {
    // Process a POST request

    console.log(req.body.serviceId);

    const createdAvailability = req.body.chosenAvailabilities.forEach(
      async (availability: any) => {
        // 1. if the timeslot exists return an error
        // const availabilityExists = await availabilityAlreadyExists(
        //   req.body.serviceId,
        //   availability.day,
        //   availability.timeslots,
        // );

        // if (availabilityExists) {
        //   return res.status(401).json({
        //     errors: [
        //       {
        //         message: 'Availability already exists',
        //       },
        //     ],
        //   });
        // } else {
        // if not create a new availability
        await createNewAvailability(
          req.body.serviceId,
          availability.day,
          availability.timeslots,
        );
      },
      // },
    );
    res.status(200).json({ availabilities: createdAvailability });
  } else {
    // Handle any other HTTP method
    res.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
