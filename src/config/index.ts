import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env : process.env.NODE_ENV,
  port: process.env.PORT,
  db:{
    port : process.env.DB_PORT,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
    client : process.env.CLIENT,
  }
}