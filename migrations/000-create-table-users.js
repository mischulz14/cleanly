exports.up = async (sql) => {
  await sql`
  CREATE TABLE users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(50),
  last_name varchar(50),
  email varchar(50),
  password_hash varchar(50),
  created_at timestamp,
  role varchar(50)
    );
  `;
};

exports.down = async (sql) => {
  await sql`
  DROP TABLE users;
  `;
};
