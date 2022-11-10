import { sql } from './connect';

type Session = {
  id: number;
  token: string;
  userId: number;
};

// insert a new session
export async function createSession(userId: number, token: string) {
  const [session] = await sql<Session[]>`
    INSERT INTO sessions (user_id, token)
    VALUES (${userId}, ${token})
    RETURNING *
  `;
  return session;
}

// get valid session by token
export async function getSessionByToken(token: string) {
  if (!token) return undefined;
  const [session] = await sql<Session[]>`
    SELECT
      sessions.id,
      sessions.token
    FROM
      sessions
    WHERE
      sessions.token = ${token}
    AND
      sessions.expires > NOW()
  `;
  return session;
}
