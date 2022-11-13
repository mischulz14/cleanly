exports.up = async (sql) => {
  await sql`
  CREATE TABLE availabilities (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  service_id integer,
  day varchar(255),
  timeslots jsonb
)`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE availabilities;
`;
};
