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

  await deleteExpiredSessions();

  return session!;
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

export async function getValidSessionByToken(token: Session['token']) {
  if (!token) return undefined;

  const [session] = await sql<Session[]>`
    SELECT
      sessions.id,
      sessions.token,
      sessions.user_id
    FROM
      sessions
    WHERE
      sessions.token = ${token}
    AND
      sessions.expires > NOW()
  `;
  return session;
}

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
    DELETE FROM sessions
    WHERE sessions.expires < NOW()
    RETURNING
    id,
    token
  `;
  return sessions;
}

export async function deleteSessionByToken(token: string) {
  const [session] = await sql<Session[]>`
    DELETE FROM sessions
    WHERE sessions.token = ${token}
    RETURNING
    id,
    token
  `;
  return session!;
}
