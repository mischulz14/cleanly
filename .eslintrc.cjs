require('dotenv-safe').config({
  path: './.env',
});

module.exports = {
  extends: ['@upleveled/upleveled'],
  plugins: ['@ts-safeql/eslint-plugin'],
  rules: {
    '@ts-safeql/check-sql': [
      'error',
      {
        connections: [
          {
            databaseUrl: `postgres://${process.env.PGUSERNAME}:${process.env.PGPASSWORD}.@localhost:5432/${process.env.PGDATABASE}`,
            connectionName: 'sql',
            fieldTransform: 'camelCase',
            transform: '{type}[]',
          },
        ],
      },
    ],
  },
};
