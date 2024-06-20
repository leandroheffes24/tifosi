const express = require("express")
const app = express()
const mainRouter = require("./src/routers/mainRouter")
const usersRouter = require("./src/routers/usersRouter")
const categoriesRouter = require("./src/routers/categoriesRouter")
const tallesRouter = require("./src/routers/tallesRouter")
const productsRouter = require("./src/routers/productsRouter")
const carritoRouter = require("./src/routers/carritoRouter")
const session = require("express-session")
const methodOverride = require("method-override");
const userLoggedInMiddleware = require("./src/middlewares/userLoggedInMiddleware")
const rememberMiddleware = require("./src/middlewares/rememberMiddleware")
const cookies = require("cookie-parser");

app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: false}))
app.use(
    session({
        secret:"sessionGeneral",
        resave:false,
        saveUninitialized:false,
    })
);
app.use(methodOverride("_method"))
app.use(cookies())
app.use(userLoggedInMiddleware)
app.use(rememberMiddleware)
app.use(mainRouter)
app.use(usersRouter)
app.use(categoriesRouter)
app.use(tallesRouter)
app.use(productsRouter)
app.use(carritoRouter)

app.set("view engine", "ejs")
app.set("views", __dirname + "/src/views")

const PORT = process.env.port || 3999
app.listen(PORT, console.log(`running server on port ${PORT}`))