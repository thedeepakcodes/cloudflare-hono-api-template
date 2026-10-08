import { ValidationTargets } from "hono";
import { validator } from "hono/validator";
import z from "zod";

export function validate<T extends z.ZodType>(target: keyof ValidationTargets, schema: T) {
  return validator(target, (value) => {
    return schema.parse(value);
  });
}
