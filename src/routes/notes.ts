import { Router } from "express";
import { handleNotesPost } from "../controllers/notes";

const router = Router();

router.post("/", handleNotesPost);

export default router;
