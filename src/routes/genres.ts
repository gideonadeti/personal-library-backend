import { Router } from "express";
import {
  handleGenresGet,
  handleGenresPost,
  handleGenresPut,
  handleGenresDelete,
} from "../controllers/genres";

const router = Router();

router.get("/", handleGenresGet);
router.post("/", handleGenresPost);
router.put("/:genreId", handleGenresPut);
router.delete("/:genreId", handleGenresDelete);

export default router;
