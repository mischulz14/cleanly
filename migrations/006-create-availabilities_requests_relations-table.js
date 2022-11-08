exports.up = async (sql) => {
  await sql`
  CREATE TABLE availabilities_requests_relations (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    availability_id integer,
    FOREIGN KEY (availability_id) REFERENCES availabilities(id),
    request_id integer,
    FOREIGN KEY (request_id) REFERENCES requests(id)
  )`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE availabilities_requests_relations;
`;
};
