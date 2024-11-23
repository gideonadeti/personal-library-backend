import { Router } from "express";
import { handleAuthorsGet, handleAuthorsPost } from "../controllers/authors";

const router = Router();

router.get("/", handleAuthorsGet);
router.post("/", handleAuthorsPost);

export default router;
