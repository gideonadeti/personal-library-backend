import { Router } from "express";
import {
  handleNotesPost,
  handleNotesPut,
  handleNotesDelete,
} from "../controllers/notes";

const router = Router();

router.post("/", handleNotesPost);
router.put("/:noteId", handleNotesPut);
router.delete("/:noteId", handleNotesDelete);

export default router;
