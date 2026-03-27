import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            trim: true
        },
        status: {
            type: String,
            enum: ["active","complated"],
            default: "active"
        },
        completeAt: {
            type: Date,
            default: null,
        }
    },
    {
        timestamps: true, //automatically add createAt and updateAt
    }
)

const Task = mongoose.model("Task", taskSchema)
export default Task