import sequelize from "../dbConfig/config.js"
import { DataTypes } from "sequelize"
import { RequestModelTable }from "../dbConfig/dbSyncingStatus.js"

const RequestModel = sequelize.define('RequestModel',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    Method:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    Hostname : {
        type:DataTypes.STRING,
        allowNull:true
    },
    path:{
        type:DataTypes.STRING,
        allowNull:true
    },
    time:{
        type:DataTypes.STRING,
        allowNull:true
    },
    Body:{
        type:DataTypes.STRING(500),
        allowNull:true
    }

})

if(RequestModelTable.force){
    RequestModel.sync({force:RequestModelTable.alter})
}

if(RequestModelTable.alter){
    RequestModel.sync({alter : RequestModelTable.alter})
}

export default RequestModel

//TODO:console.log(req.method,req.hostname, req.path, req.time,req.body);
