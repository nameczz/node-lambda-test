import elasticSearchClient from "./common/Client";

export async function handler(data: any) {
  try {
    const res = await elasticSearchClient.search(data);
    return res;
  } catch (e: any) {
    throw new Error(e.meta ? e.meta.body.error.reason : "error");
  }
}
