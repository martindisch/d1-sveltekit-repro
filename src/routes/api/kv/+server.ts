import { type RequestHandler, json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, platform }) => {
  const value = await platform.env.kv.list();
  return json({ keys: value.keys });
};
