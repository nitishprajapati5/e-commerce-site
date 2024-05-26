const port = process.env.APP_PORT_NO || 3000
import checkDatabaseConnection from "./src/dbConfig/checkDatabaseConnection.js"
import { app } from "./src/app.js"


//Testing the Connection

checkDatabaseConnection().then(() => (
    app.listen(port,() => (    
    console.log(`App is listening on port ${port}`)))


)).catch((error) => (
    console.log("Something is Wrong Please Check",error.message)
))






















// app.listen(port,() => {
//     console.log(`App is listening on port ${port}`)
// })

