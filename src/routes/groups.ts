import { Router } from "express";
import {
  handleGroupsGet,
  handleGroupsPost,
  handleGroupsPut,
} from "../controllers/groups";

const router = Router();

router.get("/", handleGroupsGet);
router.post("/", handleGroupsPost);
router.put("/:groupId", handleGroupsPut);

export default router;
