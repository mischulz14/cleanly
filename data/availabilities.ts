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

export async function createNewTimeslot(
  start_time: string,
  end_time: string,
  availability_id: number,
) {
  const newTimeslot = await sql`
INSERT INTO timeslots (start_time, end_time, availability_id)
VALUES (${start_time}, ${end_time}, ${availability_id})
RETURNING *
`;
  return newTimeslot;
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

export async function findTimeslotToDelete(
  id: string,
  day: string,
  timeslot: any,
) {
  // 1. find the availability
  const availability = await sql`
SELECT * FROM availabilities
WHERE service_id = ${id} AND day = ${day}
`;

  // const availabilityArrayCopy = availability[0]?.timeslots;
  // console.log('availabilityArrayCopy at first', availabilityArrayCopy);

  console.log(
    '!!!!!!!!!!!!!!!!!!!! FIND TIMESLOT TO DELETE !!!!!!!!!!!!!!!!!!!!!!!!!!!!',
  );
  // console.log('timeslot from request:', timeslot);
  // console.log('timeslots from db:', availability[0]?.timeslots);
  // console.log('timeslot from request:', timeslots);
  if (availability[0]?.timeslots.find((t: any) => t.id === timeslot.id)) {
    console.log('FOUND MATCH');
    const timeslotToDelete = timeslot;
    return { day: day, timeslot: { ...timeslotToDelete } };
    // const index = availabilityArrayCopy.indexOf(timeslot);
    // console.log('index', index);
    // availabilityArrayCopy.splice(index, 1);
    // console.log('availabilityArrayCopy', availabilityArrayCopy);
  } else {
    console.log('NO MATCH');
  }
}

export async function updateAvailabilities(
  id: string,
  day: string,
  timeslotsToDelete: any,
) {
  console.log('!!!!!!!!!!!!!!UPDATE AVAILABILITIES!!!!!!!!!!!!!!!!!!!!');
  // console.log('timeslotToDelete', timeslotsToDeleteArr);
  // console.log('availabilities in db', availability[0]?.timeslots);

  const availability = await sql`
  SELECT * FROM availabilities
  WHERE service_id = ${id} AND day = ${day}
  `;

  console.log('availability timeslots', availability[0]?.timeslots);

  timeslotsToDelete.forEach((timeslotToDelete: any) => {
    //  find the index of the timeslot to delete
    const index = availability[0]?.timeslots.findIndex((timeslot: any) => {
      return timeslotToDelete.id === timeslot.id;
    });
    console.log('timeslot found at index', index);
    const splicedAvailabilities = availability[0]?.timeslots.splice(index, 1);
    console.log(splicedAvailabilities);
  });

  const updatedAvailability = await sql`
  UPDATE availabilities SET timeslots = ${availability[0]?.timeslots} WHERE service_id = ${id} AND day = ${day}
  `;

  // if the timeslots array is empty, delete the availability
  if (availability[0]?.timeslots.length === 0) {
    const deletedAvailability = await sql`
  DELETE FROM availabilities WHERE service_id = ${id} AND day = ${day}
  `;
  }
}
