import { Router } from "express";
import { handleBooksGet } from "../controllers/books";

const router = Router();

router.get("/", handleBooksGet);

export default router;
