import express from 'express';
import connectDB from './config/db.js';
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import tasksRoutes from './routes/tasksRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Test');
});