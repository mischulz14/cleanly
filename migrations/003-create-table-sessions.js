exports.up = async (sql) => {
  await sql`
CREATE TABLE sessions (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id integer REFERENCES users(id) ON DELETE CASCADE,

  token varchar(120) NOT NULL UNIQUE,
  expires timestamp NOT NULL DEFAULT NOW() + INTERVAL '1 day')`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE sessions`;
};
