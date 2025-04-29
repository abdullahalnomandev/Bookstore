import { Knex } from "knex";
import path from 'path';
import config from "../config";

type IKnexConfig = {
  [key: string]: Knex.Config;
}

const BASE_PATH = path.join(__dirname);

export const knexConfig:IKnexConfig = {
  development: {
    client: process.env.client,
    connection: {
      port : Number(config.db.port),
      user : config.db.user,
      password : config.db.password ,
      database : config.db.database
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(BASE_PATH, 'knex', 'migrations'),
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: path.join(BASE_PATH, 'knex', 'seeds')
    }
  }
};

export default knexConfig;
