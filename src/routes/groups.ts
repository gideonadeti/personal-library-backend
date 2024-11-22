import { Router } from "express";
import { handleGroupsGet, handleGroupsPost } from "../controllers/groups";

const router = Router();

router.get("/", handleGroupsGet);
router.post("/", handleGroupsPost);

export default router;
