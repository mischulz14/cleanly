import { sql } from './connect';
import { User } from './users';

export async function joinUserAndServiceTableWithSpecificId(params: any) {
  const { userId, serviceId } = params;
  const [user] = await sql<User[]>`
        SELECT * FROM users
        JOIN services_users_relations ON users.id = services_users_relations.user_id
        JOIN services ON services.id = services_users_relations.service_id
        WHERE users.id = ${userId} AND services.id = ${serviceId}
    `;
  console.log(user);
  return user;
}

export async function selectAllServices() {
  // select all users who are service providers
  const users = await sql`
  SELECT * FROM users WHERE users.role = 'service'
  `;

  // join users and services by mapping through users and selecting all services that match the user id
  const servicesWithUsers = await Promise.all(
    users.map(async (user) => {
      const services = await sql`
        SELECT * FROM services
        JOIN services_users_relations ON services.id = services_users_relations.service_id
        JOIN users ON users.id = services_users_relations.user_id
        WHERE users.id = ${user.id}
      `;
      return services;
    }),
  );
  return servicesWithUsers;
}
