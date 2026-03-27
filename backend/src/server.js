import express from "express"
import tasksRoutes from "./routes/tasksRoutes.js"
import { connectDB } from "./config/db_mongo.js"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"

dotenv.config()
const PORT = process.env.PORT || 5001
//When we put this to Render, js don't know where to find, so this will help
const __dirname = path.resolve() 

const app = express()

if(process.env.NODE_ENV !== "production"){
    app.use(cors({origin: "http://localhost:5173"}))
}

app.use(express.json())

app.use("/api/tasks",tasksRoutes)


if(process.env.NODE_ENV === "production"){
    //Backend will use folder dist in frontend
    //express.static (it will get all of file html, css, js)
app.use(express.static(path.join(__dirname, "../frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
})
}


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})


