import { Router } from "express";
import { handleGenresGet, handleGenresPost } from "../controllers/genres";

const router = Router();

router.get("/", handleGenresGet);
router.post("/", handleGenresPost);

export default router;
