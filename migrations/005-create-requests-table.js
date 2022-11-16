exports.up = async (sql) => {
  await sql`
CREATE TABLE requests (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id integer,
  FOREIGN KEY (user_id) REFERENCES users(id),
  service_id integer,
  FOREIGN KEY (service_id) REFERENCES services(id),
  timeslots jsonb,
  status varchar(255),
  service_name varchar(255),
  service_email varchar(255),
  user_name varchar(255),
  day varchar(50)
)`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE requests;
`;
};
