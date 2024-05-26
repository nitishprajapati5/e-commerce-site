import 'dotenv/config'
import { NUMBER } from 'sequelize'

const configuration = {
    "Database" : String(process.env.DATABASE_NAME),
    "user":String(process.env.USER_NAME),
    "pass":String(process.env.PASSWORD),
    "host":String(process.env.HOST),
    "dialect":String(process.env.DIALECT),
    "port":Number(process.env.PORT_NO)
}

export default configuration