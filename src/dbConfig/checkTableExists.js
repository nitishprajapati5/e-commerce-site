import Register from "../Models/Register.js";
import sequelize from "./config.js";

async function checkTableExists(tableName,columns){
    try{
        const result = await sequelize.query(
            `SELECT TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME=:tableName`,
            {
                replacements : {tableName},
                type : sequelize.QueryTypes.SELECT
            }
        );

        if(tableName.length === 0){
            return {exists:false,columnsMatch:false}
        }

        const columnResults = await sequelize.query(
            `SELECT COLUMN_NAME, DATA_TYPE 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = :tableName`,
            {
            replacements: { tableName },
            type: sequelize.QueryTypes.SELECT
            }
        );

        console.log(columnResults)


        const existingColums = columnResults.reduce((acc,column) => {
            acc[column.COLUMN_NAME] = column.DATA_TYPE
            return acc;
        },{})


        const columnsMatch = columns.every(column => {
            return existingColums[column.name] && existingColums[column.name] === column.type;
        })

        return {exists : true , columnsMatch}
    }
    catch(error){
        console.error('Error checking table and columns existence',error)
        return {exists:false,columnsMatch:false}
    }
}

export default checkTableExists