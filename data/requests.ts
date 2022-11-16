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

export async function getRequestByUserId(userId: number) {
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

export async function getRequestByServiceId(serviceId: number) {
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
