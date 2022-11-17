import { sql } from './connect';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  role: string;
};

export async function getUserByEmail(email: string) {
  if (!email) {
    return null;
  }
  const [user] = await sql<User[]>`
    SELECT * FROM users
    WHERE users.email = ${email}
  `;
  return user!;
}

export async function getUserById(id: number) {
  if (!id) {
    return null;
  }
  const [user] = await sql<User[]>`
    SELECT * FROM users
    WHERE users.id = ${id}
  `;
  return user!;
}

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  passwordHash: string,
  image: string,
  role: string,
) {
  const [user] = await sql<User[]>`
    INSERT INTO users (first_name, last_name, email, password_hash, image, role)
    VALUES (${firstName}, ${lastName}, ${email}, ${passwordHash},${image}, ${role})
    RETURNING *
  `;
  // exclamation mark is used to tell typescript that we are sure that the user exists
  return user!;
}

export async function getUserByPasswordHashAndEmail(
  passwordHash: string,
  email: string,
) {
  const [user] = await sql<User[]>`
    SELECT * FROM users
    WHERE users.password_hash = ${passwordHash} AND users.email = ${email}
  `;
  return user;
}

export async function updateUser(id: number, lastName: string, email: string) {
  const [user] = await sql<User[]>`
    UPDATE users
    SET last_name = ${lastName}, email = ${email}
    WHERE users.id = ${id}
    RETURNING *
  `;
  return user!;
}

export async function updateUserImage(id: number, image: string) {
  const [user] = await sql<User[]>`
    UPDATE users
    SET image = ${image}
    WHERE users.id = ${id}
    RETURNING *
  `;
  return user!;
}
