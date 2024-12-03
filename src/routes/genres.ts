import { Router } from "express";
import {
  handleGenresGet,
  handleGenresPost,
  handleGenresPut,
} from "../controllers/genres";

const router = Router();

router.get("/", handleGenresGet);
router.post("/", handleGenresPost);
router.put("/:genreId", handleGenresPut);

export default router;
