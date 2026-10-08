import { Hono } from "hono";
import z from "zod";

import { validate } from "../../middlewares/validate";
import { getRoot } from "./controller";

const rootRouter = new Hono();

rootRouter.get("/", validate("query", z.object({ id: z.coerce.number("Invalid Id") })), getRoot);

export default rootRouter;
