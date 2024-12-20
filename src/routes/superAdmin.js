import express from "express";
import { createRealm, loginToSuperAdmin } from "../controllers/superAdmin.js";

const router=express.Router();

router.post("/login",loginToSuperAdmin);
router.post('/realm',createRealm);

export default router;