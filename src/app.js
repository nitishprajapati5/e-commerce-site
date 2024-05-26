import express from 'express'
import cors from 'cors'
import {RequestLogging} from "./Logging/RequestLogging.js"
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({
    extended:false
}))
app.use(RequestLogging);
//routes Import
import registerRoute from './Routes/registerRoute.js'
import loginRoute from './Routes/loginRoute.js'

app.use("/api/v1/",registerRoute)
app.use("/api/v1",loginRoute)

export {app}