const express = require("express")
const mainRouter = require("./src/routers/mainRouter")
const usersRouter = require("./src/routers/usersRouter")
const app = express()
const session = require("express-session")
const userLoggedInMiddleware = require("./src/middlewares/userLoggedInMiddleware")

app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: false}))
app.use(
    session({
        secret:"sessionGeneral",
        resave:false,
        saveUninitialized:false,
    })
);
app.use(userLoggedInMiddleware)
app.use(mainRouter)
app.use(usersRouter)

app.set("view engine", "ejs")
app.set("views", __dirname + "/src/views")

const PORT = process.env.port || 3999
app.listen(PORT, console.log(`running server on port ${PORT}`))