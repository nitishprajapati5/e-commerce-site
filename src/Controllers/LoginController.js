//TODO:generateAccessTokenandRefreshToken
//TODO:LoginProcess

import { asyncHandler } from "../Utils/asyncHandler.js"
import { ApiError } from "../Utils/ApiError.js"
import { ApiResponse } from "../Utils/ApiResponse.js"
import Register from "../Models/index.js"
import {generateAccessToken,generateRefreshToken} from "../Controllers/tokenController.js"
import { where } from "sequelize"
import jwt from "jsonwebtoken"


const generateAccessTokenandRefreshToken = async(userId,name,email) =>{
    try {
        const userDataExists = await Register.Register.findOne({
            where : {
                id : userId
            }
        }).catch((error) => (console.log(error)))

        console.log("Logging into Details",userId,name,email)

        const accessToken = generateAccessToken(userId,email,name)
        const refreshToken = generateRefreshToken(userId)

        console.log("Is it Generating",accessToken,refreshToken)
        //Database Save
        // userDataExists.accessToken = accessToken
        // userDataExists.refreshToken = refreshToken

        userDataExists.set({
            accessToken : accessToken,
            refreshToken : refreshToken
        })

        await userDataExists.save()

        return { accessToken,refreshToken }

    } catch (error) {
        console.log(error)
    }
}

const LoginUser = asyncHandler(async(req,res) => {
    try {
        const {email,password} = req.body
        console.log("Email and Password",email,password)
        if(!email || email === "" || !password || password === ""){
            return res.status(400).json(new ApiResponse(400,"Please Provide Email or Password"))
        }

        const userDataExists = await Register.Register.findOne({
            where : {
                email : email,
                password : password
            },
            attributes : ["id","Name"]
        }).catch((error) => (console.log(error)))

        console.log(userDataExists)

        if(!userDataExists){
            return res.status(400).json(new ApiResponse(400,"User Does not Exists"))
        }

        const {accessToken,refreshToken} = await generateAccessTokenandRefreshToken(userDataExists.dataValues.id,userDataExists.dataValues.Name,email)
        console.log("Access Token Is",accessToken,refreshToken)
        return res.status(200).json(new ApiResponse(200,{
            accessToken:accessToken,
            refreshToken:refreshToken
        },"User Logged in Successfully"))

    } catch (error) {
        console.log(error.message)
        throw new ApiError(400,"Something is not going good",error)
    }
})

const refreshAccessToken = asyncHandler(async(req,res) => {
    const incomingRefreshToken = req.body.refreshToken
    if(!incomingRefreshToken){
        return res.status(401).json( new ApiResponse(401,{},"UnAuthrized Request"))
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await Register.Register.findOne(
            {
                where:{
                    id : decodedToken?.id
                }
            }
        )

        if(!user){
            return res.status(401).json(401,{},"Invalid Refresh Token")
        }

        if(incomingRefreshToken !== user.dataValues.refreshToken){
            return res.status(401).json(401,{},"Refresh Token Expired")
        }

        const { accessToken,newRefreshToken } = await generateAccessTokenandRefreshToken(user.dataValues.id,user.dataValues.Name,user.dataValues.email)

        return res.status(200).json(new ApiResponse(
            200,
            {
                accessToken:accessToken,
                refreshToken:newRefreshToken
            },
            "Access Token Refreshed"
        ))

    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid refresh token")
    }
    
})


export {
    LoginUser,
    refreshAccessToken

}