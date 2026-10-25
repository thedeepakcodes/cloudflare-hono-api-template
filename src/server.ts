import { Hono } from "hono";
import { NotFound } from "./common/errors";
import { corsMiddleware } from "./lib/cors";
import { errorHandler } from "./middlewares/error";
import rootRouter from "./modules/root/route";

const app = new Hono();

app.use("*", corsMiddleware);

app.route("/", rootRouter);

app.notFound(() => {
  throw new NotFound("Route not found.");
});

app.onError(errorHandler);

export default app;
