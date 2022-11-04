exports.up = async (sql) => {
  await sql`
CREATE TABLE services (
 id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(50),
  description varchar(50),
  price integer,
  role varchar(50),
  created_at timestamp,
  district varchar(5)
);
`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE services;
`;
};
