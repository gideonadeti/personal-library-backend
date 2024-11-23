import { Router } from "express";
import { handleGenresGet } from "../controllers/genres";

const router = Router();

router.get("/", handleGenresGet);

export default router;
