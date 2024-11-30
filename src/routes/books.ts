import { Router } from "express";
import {
  handleBooksGet,
  handleBooksPost,
  handleBooksPut,
} from "../controllers/books";

const router = Router();

router.get("/", handleBooksGet);
router.post("/", handleBooksPost);
router.put("/:bookId", handleBooksPut);

export default router;
