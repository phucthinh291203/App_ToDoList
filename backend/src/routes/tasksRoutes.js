import express from "express"
import { getAllTasks, updateTasks, addTasks, deleteTasks } from "../controllers/tasksControllers.js"
const router = express.Router()

router.get("/", getAllTasks)

router.post("/", addTasks)

router.put("/:id", updateTasks)

router.delete("/:id", deleteTasks)

export default router