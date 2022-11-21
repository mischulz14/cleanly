exports.up = async (sql) => {
  await sql`
    CREATE TABLE ratings (
      id SERIAL PRIMARY KEY,
      rating INTEGER,
      service_id INTEGER REFERENCES services(id)
    );
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE ratings;
  `;
};
