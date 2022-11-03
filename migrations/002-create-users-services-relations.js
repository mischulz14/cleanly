exports.up = async (sql) => {
  await sql`
CREATE TABLE services_users_relations (
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
service_id integer,
user_id integer,
FOREIGN KEY (service_id) REFERENCES services(id),
FOREIGN KEY (user_id) REFERENCES users(id)
);
`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE services_users_relations;
`;
};
