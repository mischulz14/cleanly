exports.up = async (sql) => {
  await sql`
CREATE TABLE services (
 id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(50),
  user_id integer,
  FOREIGN KEY (user_id) REFERENCES services_users_relations(service_id)
  description varchar(50),
  price integer,
  role varchar(50),
  created_at timestamp,
  location varchar(50)
);
`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE services;
`;
};
