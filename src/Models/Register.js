import { DataTypes } from "sequelize";
import Sequelize from "sequelize";
import sequelize from "../dbConfig/config.js"
import checkTableExists from "../dbConfig/checkTableExists.js";
import { RegisterTable } from "../dbConfig/dbSyncingStatus.js"
const tableName = 'Register'

const Register = sequelize.define('Register',{
    id:{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false,
    },
    Name:{
        type : DataTypes.STRING,
        allowNull : false,
        unique:false
    },
    password:{
        type : DataTypes.STRING,
        allowNull : false,
        unique:false
    },
    profile_photo :{
        type:DataTypes.STRING,
        allowNull:true
    },
    refreshToken:{
        type:DataTypes.STRING,
        allowNull:true
    },
    accessToken :{
        type : DataTypes.STRING,
        allowNull:true
    }
});

const tableStructure = [
    {name : "id",type :'int'},
    {name : "email",type : 'nvarchar'},
    {name : "Name",type : 'nvarchar'},
    {name : "password",type : 'nvarchar'},
    {name: "profile_photo",type:'nvarchar'},
    {name: "refreshToken",type:'nvarchar'},
    {name: "accessToken",type:'nvarchar'}
]


if(RegisterTable.alter){
    Register.sync({alter:RegisterTable.alter})
}

if(RegisterTable.force){
    Register.sync({alter:RegisterTable.force})
}

export default Register

