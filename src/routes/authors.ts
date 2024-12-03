import { Router } from "express";
import {
  handleAuthorsGet,
  handleAuthorsPost,
  handleAuthorsPut,
  handleAuthorsDelete,
} from "../controllers/authors";

const router = Router();

router.get("/", handleAuthorsGet);
router.post("/", handleAuthorsPost);
router.put("/:authorId", handleAuthorsPut);
router.delete("/:authorId", handleAuthorsDelete);

export default router;
