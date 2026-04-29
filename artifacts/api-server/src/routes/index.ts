import { Router, type IRouter } from "express";
import healthRouter from "./health";
import catalogRouter from "./catalog";
import leadsRouter from "./leads";
import contactRouter from "./contact";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(catalogRouter);
router.use(leadsRouter);
router.use(contactRouter);
router.use(statsRouter);

export default router;
