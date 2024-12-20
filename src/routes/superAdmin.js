import express from "express";
import { createAdminUser, createRealm, loginToSuperAdmin } from "../controllers/superAdmin.js";

const router=express.Router();

router.post("/login",loginToSuperAdmin);
router.post('/realm',createRealm);
router.post('/realm/admin',createAdminUser);

export default router;