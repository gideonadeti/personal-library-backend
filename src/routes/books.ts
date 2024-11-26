import { Router } from "express";
import { handleBooksGet, handleBooksPost } from "../controllers/books";

const router = Router();

router.get("/", handleBooksGet);
router.post("/", handleBooksPost);

export default router;
