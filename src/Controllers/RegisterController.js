import { asyncHandler } from "../Utils/asyncHandler.js";
import {ApiError} from "../Utils/ApiError.js"
import {ApiResponse} from "../Utils/ApiResponse.js"
import Register from "../Models/index.js"

const RegisterUser = asyncHandler(async(req,res) => {
    try {
        //Destructure
        //Error Check Kiya
        const {email,password,name} = req.body

        if(!email || !password || email === "" || password === ""){
            return res.status(200).json( new ApiError(200,{},"Please Provide Email or Password"))
        }
        

        //Before Inserting Check if there is duplicate email or not
        const checkDuplicateEmail = await Register.Register.findOne(
            {
                where : {
                    email : email
                }
            }
        )

    
        if(checkDuplicateEmail !== null){
            return res.status(409).json(new ApiResponse(200,{user : req.body},"Duplicate Email Found"))
        }

        const newUser = await Register.Register.create({
            email:email,
            Name:name,
            password:password        
        }).catch((Error) => (console.log(Error)))

        

        return  res.status(200).json(new ApiResponse(200,{newUserId : newUser.id},"User Created Successfully"))
        
        

    } catch (error) {
        throw new ApiError(400,"Please Provide email or Password",error.message)
    }
}) 

export {
    RegisterUser
}