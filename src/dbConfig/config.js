import { Sequelize } from "sequelize";
import configuration from "../Configuration/configuration.js";


const sequelize = new Sequelize(configuration.Database,configuration.user,configuration.pass,{
    host:configuration.host,
    dialect:configuration.dialect,
    port:configuration.port,
    dialectOptions:{
        options:{
            encrypt: true
        }
    }
});


//Testing the Connection

export default sequelize