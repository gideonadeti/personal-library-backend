import { Router } from "express";
import {
  handleBooksGet,
  handleBooksPost,
  handleBooksPut,
  handleBooksPatch,
} from "../controllers/books";

const router = Router();

router.get("/", handleBooksGet);
router.post("/", handleBooksPost);
router.put("/:bookId", handleBooksPut);
router.patch("/:bookId", handleBooksPatch); // Toggle favorite

export default router;
