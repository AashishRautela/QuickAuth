import express from "express";
import { loginToSuperAdmin } from "../controllers/superAdmin.js";

const router=express.Router();

router.post("/login",loginToSuperAdmin)

export default router;