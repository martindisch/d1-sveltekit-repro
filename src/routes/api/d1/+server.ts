import { type RequestHandler, json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, platform }) => {
  const { results } = await platform.env.DB.prepare(
    "SELECT name FROM sqlite_schema;"
  ).all();
  return json({ schemaObjects: results });
};
