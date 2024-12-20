import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'config.env' });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser())

//import routers
import superAdmintRouter from "./src/routes/superAdmin.js";
import cookieParser from 'cookie-parser';

//mount all routes
app.use("/admin",superAdmintRouter)
 

export {app};

