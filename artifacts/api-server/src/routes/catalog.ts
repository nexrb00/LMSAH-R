import { Router, type IRouter } from "express";
import {
  ListServicesResponse,
  ListPlansResponse,
  ListTestimonialsResponse,
} from "@workspace/api-zod";
import { services, plans, testimonials } from "../data/catalog";

const router: IRouter = Router();

router.get("/services", (_req, res) => {
  const data = ListServicesResponse.parse(services);
  res.json(data);
});

router.get("/plans", (_req, res) => {
  const data = ListPlansResponse.parse(plans);
  res.json(data);
});

router.get("/testimonials", (_req, res) => {
  const data = ListTestimonialsResponse.parse(testimonials);
  res.json(data);
});

export default router;
