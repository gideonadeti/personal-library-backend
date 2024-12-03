import { Router } from "express";
import {
  handleAuthorsGet,
  handleAuthorsPost,
  handleAuthorsPut,
} from "../controllers/authors";

const router = Router();

router.get("/", handleAuthorsGet);
router.post("/", handleAuthorsPost);
router.put("/:authorId", handleAuthorsPut);

export default router;
