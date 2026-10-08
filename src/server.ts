import { Hono } from "hono";
import { errorHandler } from "./middlewares/error";
import rootRouter from "./modules/root/route";
import { NotFound } from "./common/errors";

const app = new Hono();

app.route("/", rootRouter);

app.notFound(() => {
  throw new NotFound("Route not found.");
});

app.onError(errorHandler);

export default app;
