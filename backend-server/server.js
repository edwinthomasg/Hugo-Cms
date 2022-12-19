const hapi = require("@hapi/hapi")
const routes = require("./routes/route")
require("dotenv").config()

const establishServer = async() => {
    const server = new hapi.Server({
        port: process.env.PORT_NUMBER,
        host: "localhost",
        routes: {
            cors: true
        }
    })
    routes(server)
    await server.start()
    console.log(`server listening on : ${server.info.uri}`)
}

establishServer()