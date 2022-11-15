import { es } from 'date-fns/locale';
import { sql } from './connect';
import { timeslots } from './timeslots';

export async function createNewAvailability(
  service_id: number,
  day: string,
  timeslots: any,
) {
  // 1. check if the day already exists in the database
  const availabilities = await sql`
  SELECT * FROM availabilities WHERE service_id = ${service_id} AND day = ${day}
  `;

  // 2. if the day exists, update the timeslots
  if (availabilities.length > 0) {
    const availability = availabilities[0];
    const newTimeslots = availability?.timeslots.concat(timeslots);
    const updatedAvailability = await sql`
      UPDATE availabilities SET timeslots = ${newTimeslots} WHERE id = ${availability?.id}
    `;
    return updatedAvailability;
  } else {
    // 3. if the day does not exist, create a new availability
    const newAvailability = await sql`
    INSERT INTO availabilities (service_id, day, timeslots)
    VALUES (${service_id}, ${day}, ${timeslots})
    RETURNING *
    `;
    return newAvailability;
  }
}

export async function getAllAvailabilitiesById(id: number | string) {
  const availabilities = await sql`
SELECT * FROM availabilities
WHERE service_id = ${id}
`;
  return availabilities;
}

export async function getAvailabilitiesByDay(id: number | string, day: string) {
  const availabilities = await sql`
SELECT * FROM availabilities
WHERE service_id = ${id} AND day = ${day}
`;
  return availabilities;
}

export async function availabilityAlreadyExists(
  day: string,
  id: number,
  timeslots: any,
) {
  const availability = await sql`
SELECT * FROM availabilities
WHERE day = ${day} AND service_id = ${id} AND timeslots = ${timeslots}
`;
  if (availability.length > 0) {
    return true;
  } else {
    return false;
  }
}

//=============================
//SECTION === 'PROCESS A USER REQUEST TO DELETE AN AVAILABILITY' === SECTION
//=============================

export async function findTimeslotToDelete(
  id: string,
  day: string,
  timeslot: any,
) {
  // 1. find the availability on a given day and service in the database
  const availability = await sql`
SELECT * FROM availabilities
WHERE service_id = ${id} AND day = ${day}
`;

  // 2. find the timeslot
  if (availability[0]?.timeslots.find((t: any) => t.id === timeslot.id)) {
    // 2.1 if the timeslot is found return it
    const timeslotToDelete = timeslot;
    return { day: day, timeslot: { ...timeslotToDelete } };
  } else {
    console.log('NO MATCH');
  }
}

export async function updateAvailabilities(
  id: string,
  day: string,
  timeslotsToDelete: any,
) {
  // 1. find the availability on a given day and service in the database
  const availability = await sql`
  SELECT * FROM availabilities
  WHERE service_id = ${id} AND day = ${day}
  `;

  // 2. iterate over the timeslots to delete
  timeslotsToDelete.forEach((timeslotToDelete: any) => {
    //2.1  find the index of the timeslot to delete
    const index = availability[0]?.timeslots.findIndex((timeslot: any) => {
      return timeslotToDelete.id === timeslot.id;
    });
    // 2.2 remove the timeslot from the array
    availability[0]?.timeslots.splice(index, 1);
  });

  // 3. update the availability
  const updatedAvailability = await sql`
  UPDATE availabilities SET timeslots = ${availability[0]?.timeslots} WHERE service_id = ${id} AND day = ${day}
  `;

  //4. if the timeslots array is empty, delete the availability
  if (availability[0]?.timeslots.length === 0) {
    const deletedAvailability = await sql`
  DELETE FROM availabilities WHERE service_id = ${id} AND day = ${day}
  `;
    return deletedAvailability;
  }
}
