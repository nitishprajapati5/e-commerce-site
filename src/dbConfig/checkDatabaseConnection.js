import sequelize from "./config.js";

async function checkDatabaseConnection(){
    try {
        await sequelize.authenticate();
        console.log("Connection has been establish Successfully")
    
    } catch (error) {
        console.error("Unable to connect to the Database",error)
    }
}


export default checkDatabaseConnection