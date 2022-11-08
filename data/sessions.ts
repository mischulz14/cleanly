import { sql } from './connect';

type Session = {
  id: number;
  token: string;
  userId: number;
};

// insert a new session
export async function insertSession(params: Session) {
  const { userId, token } = params;
  const [session] = await sql<Session[]>`
    INSERT INTO sessions (user_id, token)
    VALUES (${userId}, ${token})
    RETURNING *
  `;
  return session;
}
