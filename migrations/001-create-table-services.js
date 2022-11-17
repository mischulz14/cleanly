exports.up = async (sql) => {
  await sql`
CREATE TABLE services (
 id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  company_name varchar(50),
  description varchar(50),
  price integer,
  district varchar(5)
);
`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE services;
`;
};
