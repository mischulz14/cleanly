import { sql } from './connect';
import { timeslots } from './timeslots';

export async function createNewRequest(
  userId: number,
  serviceId: number,
  timeslots: any,
  day: string,
  serviceName: string,
  serviceEmail: string,
  userName: string,
  status: string,
) {
  const [request] = await sql`
    INSERT INTO requests (user_id, service_id, timeslots, day, service_name, service_email, user_name, status)
    VALUES (${userId}, ${serviceId}, ${timeslots}, ${day}, ${serviceName}, ${serviceEmail}, ${userName}, ${status})
    RETURNING *
  `;

  return request!;
}

export async function getRequestsByUserId(userId: any) {
  const request = await sql`
    SELECT
      *
    FROM
      requests
    WHERE
      requests.user_id = ${userId}
  `;

  return request;
}

export async function getRequestsByServiceId(serviceId: any) {
  const request = await sql`
    SELECT
      *
    FROM
      requests
    WHERE
      requests.service_id = ${serviceId}
  `;

  return request;
}

export async function updateRequest(status: string, id: number) {
  const [request] = await sql`
    UPDATE requests
    SET status = ${status}
    WHERE id = ${id}
    RETURNING *
  `;

  return request;
}

export async function findRequestByUserIdDayAndTimeslot(
  userId: string,
  day: string,
  timeslots: any,
) {
  const [request] = await sql`
    SELECT
      *
    FROM
      requests
    WHERE
      requests.user_id = ${userId} AND requests.day = ${day} AND requests.timeslots = ${timeslots}
  `;

  console.log('request', request);

  return request;
}

export async function deleteRequest(requestId: number) {
  const [request] = await sql`
    DELETE FROM requests
    WHERE id = ${requestId}
    RETURNING *
  `;

  return request;
}
