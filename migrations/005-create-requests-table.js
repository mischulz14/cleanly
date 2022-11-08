exports.up = async (sql) => {
  await sql`
CREATE TABLE requests (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id integer,
  FOREIGN KEY (user_id) REFERENCES users(id),
  service_id integer,
  FOREIGN KEY (service_id) REFERENCES services(id),
  starts date NOT NULL,
  ends date NOT NULL,
  status varchar(50) NOT NULL
)`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE requests;
`;
};
