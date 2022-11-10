exports.up = async (sql) => {
  await sql`
  CREATE TABLE timeslots (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    availability_id integer REFERENCES availabilities(id),
    start_time varchar(255),
    end_time varchar(255)
  )`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE timeslots;
`;
};
