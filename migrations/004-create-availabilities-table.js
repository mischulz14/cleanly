exports.up = async (sql) => {
  await sql`
  CREATE TABLE availabilities (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  service_id integer,
  FOREIGN KEY (service_id) REFERENCES services(id),
  starts DATE NOT NULL,
  ends DATE NOT NULL
)`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE availabilities;
`;
};
