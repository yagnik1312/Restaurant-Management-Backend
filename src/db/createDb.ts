
import {config} from '../../config/configFile';
import { Client } from 'pg';

const dbName = config.getDbName();
const dbUser = config.getDbUser();
const dbPwd = config.getDbPwd();
const dbHost = config.getDbHost();
const dbPort = config.getDbPort();

const client = new Client({
  host: dbHost,
  user: dbUser,
  password: dbPwd,
  port: dbPort
});
  
export const createDatabase = async () => {
  try {
    await client.connect();
    const dbQuery = await client.query(`SELECT FROM pg_database WHERE datname = $1`, [dbName])
    if (dbQuery.rows.length === 0) {
      await client.query(`CREATE DATABASE ${dbName}`)
    }                         
    await client.end();                                
  } catch (error) {
    console.error(error);
  } 
};

