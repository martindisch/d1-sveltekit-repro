import { type RequestHandler, json } from "@sveltejs/kit";

export const GET: RequestHandler = ({ url }) => {
  return json({ message: "Hello, world!" });
};
