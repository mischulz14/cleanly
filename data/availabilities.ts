import { sql } from './connect';

export async function createNewAvailability(
  service_id: number,
  day: string,
  timeslot_id: number,
) {
  const newAvailabilities = await sql`
INSERT INTO availabilities (service_id, day, timeslot_id)
VALUES (${service_id}, ${day}, ${timeslot_id})
RETURNING *
`;
  return newAvailabilities;
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
