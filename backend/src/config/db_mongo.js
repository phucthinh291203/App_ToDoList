import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTSTRING)
        console.log("Connect to database successfully")

    } catch (error) {
        console.log("Can not connect to database: " + error)
        process.exit(1)
        
    };
}

//mongodb+srv://phucthinh291203_db_user:uPS1sz2gluySMqdP@cluster0.jtz1wr5.mongodb.net/?appName=Cluster0

