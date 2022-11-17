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
  // join the users table with the services_users_relations table to get the service id
  const [service] = await sql`
  SELECT * FROM services
  WHERE id = ${id}
  `;

  return service;
}

export async function getServicesByUserId(userId: number) {
  if (!userId) {
    return null;
  }
  // join the users table with the services_users_relations table to get the service id
  const [services] = await sql`
  SELECT * FROM services
  JOIN services_users_relations ON services.id = services_users_relations.service_id
  JOIN users ON users.id = services_users_relations.user_id
  WHERE users.id = ${userId}
  `;
  return services;
}

export async function getUserInfoByServiceId(serviceId: number) {
  if (!serviceId) {
    return null;
  }
  // join the services table with the services_users_relations table to get the user id
  const [user] = await sql`
  SELECT * FROM users
  JOIN services_users_relations ON users.id = services_users_relations.user_id
  JOIN services ON services.id = services_users_relations.service_id
  WHERE services.id = ${serviceId}
  `;
  return user;
}

export async function createService(
  companyName: string,
  description: string,
  price: number,
  district: string,
) {
  const [service] = await sql<Service[]>`
    INSERT INTO services (company_name, description, price, district)
    VALUES (${companyName}, ${description}, ${price}, ${district})
    RETURNING *
  `;
  return service!;
}

export async function createServiceUserRelation(
  userId: number,
  serviceId: number,
) {
  const [service] = await sql<Service[]>`
    INSERT INTO services_users_relations (user_id, service_id)
    VALUES (${userId}, ${serviceId})
    RETURNING *
  `;
  return service;
}

export async function filterServices(district: string, price: number) {
  const [services] = await sql<Service[]>`
    SELECT * FROM services
    WHERE services.district = ${district} AND services.price <= ${price}
  `;
  return services;
}

export async function updateService(
  serviceId: string,
  price: string,
  description: string,
  district: string,
) {
  const [service] = await sql<Service[]>`
    UPDATE services
    SET  price = ${price}, district = ${district}, description = ${description}
    WHERE services.id = ${serviceId}
    RETURNING *
  `;
  return service!;
}
