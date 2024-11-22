import { Router } from "express";
import { handleGroupsGet } from "../controllers/groups";

const router = Router();

router.get("/groups", handleGroupsGet);

export default router;
