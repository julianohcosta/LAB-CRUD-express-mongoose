import mongoose from "mongoose";

export default async function connect() {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGODB_URI);

        console.log(
            `Connected to the database. DB_NAME: ${dbConnection.connection.name}`
        );
    } catch (error) {
        console.log(error);
    }
}
