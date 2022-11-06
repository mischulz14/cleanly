import { sql } from './connect';

export type Service = {
  id: number;
  companyName: string;
  description: string;
  price: number;
  picture: string;
  district: string;
};

export async function getServiceById(id: number) {
  if (!id) {
    return null;
  }
  const service = await sql<Service[]>`
    SELECT * FROM services
    WHERE services.id = ${id}
  `;
  return service;
}

export async function getServicesByUserId(userId: number) {
  if (!userId) {
    return null;
  }
  const services = await sql<Service[]>`
    SELECT * FROM services
    WHERE services.user_id = ${userId}
  `;
  return services;
}

export async function createService(
  companyName: string,
  description: string,
  price: number,
  picture: string,
  district: string,
) {
  const [service] = await sql<Service[]>`
    INSERT INTO services (company_name, description, price, picture, district)
    VALUES (${companyName}, ${description}, ${price}, ${picture}, ${district})
    RETURNING *
  `;
  return service!;
}

export async function createServiceUserRelation(
  userId: number,
  serviceId: number,
) {
  const service = await sql<Service[]>`
    INSERT INTO services_users_relations (user_id, service_id)
    VALUES (${userId}, ${serviceId})
    RETURNING *
  `;
  return service;
}

export async function filterServices(district: string, price: number) {
  const services = await sql<Service[]>`
    SELECT * FROM services
    WHERE services.district = ${district} AND services.price <= ${price}
  `;
  return services;
}
