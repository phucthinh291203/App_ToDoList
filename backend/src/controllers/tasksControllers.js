import Task from "../models/Tasks.js"

export const getAllTasks = async (req, res) => {

    const {timeFilter="today"} = req.query
    const now = new Date()
    let startDate;
    switch (timeFilter){
        case "today": {  
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            break
        }
        case "week": {  
            const mondayDate = now.getDate - (now.getDay - 1) - (now.getDay() === 0 ? 7 : 0)
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate)
            break
        }

        case "month": {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1)
            break
        }

        case "all" : 
        default : {
            startDate = null
        }
        
    }

    const query = startDate ? {createdAt : {$gte : startDate}} : {}

    try{
        const result = await Task.aggregate([
        {
            $match: query
        },
        { 
            $facet:{
                tasks:[{$sort : { createdAt: -1}}],
                activeCount: [{$match : {status: "active"}}, {$count : "count"}],
                completedCount: [{$match :{status:"completed"}}, {$count : "count"}]
            }
        }])

        const tasks = result[0].tasks
        const activeCount = result[0].activeCount[0]?.count || 0
        const completedCount = result[0].completedCount[0]?.count || 0  

        res.status(200).json({tasks, activeCount, completedCount})
    } catch (error) {
        console.log("Error at getAllTasks", error)
        res.status(500).json({"message":"System error"})
    }
}

export const addTasks = async (req, res) => {
    try {
        const {title} = req.body
        const newTask = await Task.create({title})
        res.status(200).json(newTask)
    } catch (error) {
        res.status(500).json({"message":"System error"})
    }
    
}

export const updateTasks = async (req, res) => {
    try {
        const {title, status, completeAt} = req.body
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                status,
                completeAt
            },
            {returnDocument: 'after'} //true = return data after updated, false = before updated
        )
        if(!updatedTask){
           return res.status(404).json({"message":"Task not found"})
        }
        res.status(200).json(updatedTask)
    } catch (error) {
        res.status(500).json({"message":"System error"})
    }
    
}

export const deleteTasks =async (req, res) => {
    try {
        const deletedTasks = await Task.findByIdAndDelete(req.params.id)
        if (!deleteTasks){
            return res.status(404).json({"message":"Task not found"})
        }
        res.status(200).json({"message": "task deleted"})
    } catch (error) {
        res.status(500).json({"message":"System error"})
    }
    
}

