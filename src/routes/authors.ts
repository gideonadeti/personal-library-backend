import { Router } from "express";
import { handleAuthorsGet } from "../controllers/authors";

const router = Router();

router.get("/", handleAuthorsGet);

export default router;
