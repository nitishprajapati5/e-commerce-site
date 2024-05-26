import { asyncHandler } from "../Utils/asyncHandler.js";
import RequestModel from "../Models/RequestModel.js"
import {ApiError} from "../Utils/ApiError.js"



const RequestLogging = async(req,res,next) => {
        try {
            const data = await RequestModel.create({
                Method:req.method,
                Hostname:req.hostname,
                path:req.path,
                time : new Date(Date.now()).toString(),
                Body:JSON.stringify(req.body)
            })
            next();
        } catch (error) {
            throw new ApiError(404,"Error Occured at Middleware")
        }
        
    
}


export { RequestLogging }