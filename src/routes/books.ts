import { Router } from "express";
import {
  handleBooksGet,
  handleBooksPost,
  handleBooksPut,
  handleBooksPatch,
  handleBooksDelete,
} from "../controllers/books";

const router = Router();

router.get("/", handleBooksGet);
router.post("/", handleBooksPost);
router.put("/:bookId", handleBooksPut);
router.patch("/:bookId", handleBooksPatch); // Toggle favorite or Update status
router.delete("/:bookId", handleBooksDelete);

export default router;
