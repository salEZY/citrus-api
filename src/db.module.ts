import { Module } from '@nestjs/common';
// Must use require instead of import, throws an error that pg is not found, could not find a solution online
const { Pool } = require('pg');

export const CONNECTION = 'CONNECTION';

const dbProvider = {
  provide: CONNECTION,
  useValue: new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    database: 'citrus',
    port: 5432,
  }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
