import elasticSearchClient from "./common/Client";

export async function handler(data: any) {
  const { index } = data;
  try {
    const res = await elasticSearchClient.indices.delete({ index });
    return res;
  } catch (e: any) {
    throw new Error(e.meta ? e.meta.body.error.reason : "error");
  }
}
