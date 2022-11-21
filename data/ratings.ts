import { sql } from './connect';

export async function createNewRating(serviceId: number, rating: number) {
  const [newRating] = await sql`
    INSERT INTO ratings (service_id, rating)
    VALUES (${serviceId}, ${rating})
    RETURNING *
  `;
  return newRating;
}

export async function getRatingsByServiceId(serviceId: number) {
  const ratings = await sql`
    SELECT * FROM ratings
    WHERE service_id = ${serviceId}
  `;
  return ratings;
}
