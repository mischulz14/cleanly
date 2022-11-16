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
      // 1. find the timeslot to delete on a specific day for a specific service
      const timeslotToDelete = await findTimeslotToDelete(
        req.query.serviceId as string,
        availability.day,
        availability.timeslot,
      );
      // timeslotToDelete example: {day: "Mon 12 Nov", timeslot: {id: 1, start: "09:00", end: "10:00"}}

      // 2. if the timeslot to delete exists, add it to the timeslots to delete array
      timeSlotsToDeleteArray.push(timeslotToDelete);

      // 3. if the length of the timeSlotsToDeleteArray is equal to the amount of the chosen availabilities by the user (which means that every chosen timeslot has been processed in the forEach loop) update the timeslots in the database
      if (
        timeSlotsToDeleteArray.length === req.body.chosenAvailabilities.length
      ) {
        // 4. update the availabilities by deleting the timeslots
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

          // 5. return the updated availabilities
          return updatedAvailabilities;
        });
      }
    });

    res.status(200).json({ availabilities: req.body.chosenAvailabilities });
  } else {
    // Handle any other HTTP method
    res.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
