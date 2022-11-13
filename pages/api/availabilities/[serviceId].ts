import { NextApiRequest, NextApiResponse } from 'next';
import {
  findTimeslotToDelete,
  getAllAvailabilitiesById,
  getAvailabilitiesByDay,
  updateAvailabilities,
} from '../../../data/availabilities';
import { timeslots } from '../../../data/timeslots';
import { groupObjectByProperties } from '../../../utils/groupObjects';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { availabilities: any };

// api to get current availabilities
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  if (req.method === 'GET') {
    //=============================
    //SECTION === 'Process a GET request to get all availabilities' === SECTION
    //=============================
    const availabilities = await getAllAvailabilitiesById(
      req.query.serviceId as string,
    );
    res.status(200).json({ availabilities: availabilities });
    return availabilities;
  } else if (req.method === 'PUT') {
    //=============================
    //SECTION === 'Process a PUT request to update availabilities' === SECTION
    //=============================

    const timeSlotsToDeleteArray: any = [];

    req.body.chosenAvailabilities.forEach(async (availability: any) => {
      const availabilities = await getAvailabilitiesByDay(
        req.body.serviceId,
        availability.day,
      );

      // 1. find the timeslot to delete only if the database has updated availabilities
      const timeslotToDelete = await findTimeslotToDelete(
        req.query.serviceId as string,
        availability.day,
        availability.timeslot,
      );

      // 2. if the timeslot to delete exists, add it to the array
      timeSlotsToDeleteArray.push(timeslotToDelete);
      console.log('timeslotsToDeleteArr:', timeSlotsToDeleteArray);

      // 3. if the length of the array is equal to the length of the chosen availabilities, delete the timeslots
      if (
        timeSlotsToDeleteArray.length === req.body.chosenAvailabilities.length
      ) {
        // 4. update the availabilities
        // 4.1 group the availabilities by day
        const groupedArray = groupObjectByProperties(
          timeSlotsToDeleteArray,
          'day',
        );
        // 4.2 update the availabilities by iterating through the grouped array
        groupedArray.forEach(async (groupedObject: any) => {
          const updatedAvailabilities = await updateAvailabilities(
            req.body.serviceId,
            groupedObject.day,
            groupedObject.timeslots,
          );
        });
      }
    });

    res.status(200).json({ availabilities: req.body.chosenAvailabilities });
  } else {
    // Handle any other HTTP method
    res.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
