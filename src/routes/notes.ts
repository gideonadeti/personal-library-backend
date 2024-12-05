import { Router } from "express";
import { handleNotesPost, handleNotesPut } from "../controllers/notes";

const router = Router();

router.post("/", handleNotesPost);
router.put("/:noteId", handleNotesPut);

export default router;
