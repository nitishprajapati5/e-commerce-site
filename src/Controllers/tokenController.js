import  jwt  from "jsonwebtoken"
import "dotenv"
const generateAccessToken = (userId,email,name) => {
    return jwt.sign({
        id : userId,
        email : email,
        name : name
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })

}

const generateRefreshToken = (userId) => {
    return jwt.sign({
        id : userId,

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    })
}

export {
    generateAccessToken,
    generateRefreshToken
}