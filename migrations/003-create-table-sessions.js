exports.up = async (sql) => {
  await sql`
CREATE TABLE sessions (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id integer,
  FOREIGN KEY (user_id) REFERENCES users(id),
  token varchar(50),
  created_at timestamp,
  expires_at timestamp
);
`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE sessions;
`;
};
