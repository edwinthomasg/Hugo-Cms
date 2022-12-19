const { filesController, directoryController } = require("../controllers/controller")

const routes = (server) => {
    server.route({
        method: "GET",
        path: "/",
        handler: (req, res) => {
            return "Getting started with cms backend"
        }
    })
    server.route({
        method: "POST",
        path: "/files",
        handler: filesController,
        options: {
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: {
                    output: 'annotated'
                }
            }
        }
    })
    server.route({
        method: "GET",
        path: "/directories",
        handler: directoryController
    })
}

module.exports = routes