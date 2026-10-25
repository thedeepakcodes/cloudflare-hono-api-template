import { customAlphabet } from "nanoid";

const alphanumeric = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const randomId = customAlphabet(alphanumeric, 21);
