import { type RequestHandler, json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, platform }) => {
  const value = await platform.env.KV.list();
  return json({ keys: value.keys });
};
