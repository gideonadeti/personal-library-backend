import { Router } from "express";
import { indexController } from "../controllers/index";

const router = Router();

router.get("/", indexController);

export default router;
