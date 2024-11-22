import { Router } from "express";
import {
  handleGroupsGet,
  handleGroupsPost,
  handleGroupsPut,
  handleGroupsDelete,
} from "../controllers/groups";

const router = Router();

router.get("/", handleGroupsGet);
router.post("/", handleGroupsPost);
router.put("/:groupId", handleGroupsPut);
router.delete("/:groupId", handleGroupsDelete);

export default router;
