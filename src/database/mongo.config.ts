import mongoose from 'mongoose'


export async function connectToDb(){
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("Mongodb connected successfully");

        })
        connection.on('error',(err)=>{
            console.log("Mongodb connection error. Please make sure mongodb is running.",err);
            process.exit();
        })
    } catch (error:any) {
        console.log("Error while connecting to MongoDb ",error)
    }
}