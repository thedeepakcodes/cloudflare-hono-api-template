import { env } from "cloudflare:workers";
import { Handler } from "hono";

import { SuccessResponse } from "../../common/responses";

export const getRoot: Handler = (c) => {
  return c.json(new SuccessResponse("Hello World!", { environment: env.NODE_ENV }));
};
