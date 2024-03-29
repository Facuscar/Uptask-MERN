import express from "express";
import { Server } from "socket.io"; 

import connectDB from "./config/db.js";
import cors from "cors"
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import tasksRoutes from "./routes/tasksRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

const whitelist = [process.env.WHITELISTED_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Cors error'));
        }
    },
};

app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", tasksRoutes);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    console.log('Test');
});

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.WHITELISTED_URL,
    },
});

io.on('connection', (socket) => {
    socket.on('open project', (projectId) => {
        socket.join(projectId);
    });

    socket.on('new task', (task) => {
        const project = task.project;
        socket.to(project).emit('task created', task);
    });

    socket.on('delete task', (task) => {
        const project = task.project;
        socket.to(project).emit('task deleted', task)
    });

    socket.on('edit task', (task) => {
        const project = task.project;
        socket.to(project).emit('task updated', task);
    })

    socket.on('change status', (task) => {
        const project = task.project;
        socket.to(project).emit('task toggled', task);
    })
});