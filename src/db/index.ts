import config from '../config'
import Knex from 'knex';
import { knexConfig } from './knexfile';

console.log("REQUERIE",config.env)


const db = Knex(knexConfig[config.env || 'development']);
export default db;