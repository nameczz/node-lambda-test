import elasticSearchClient from "./common/Client";

export async function handler(data: any) {
  const { index, id } = data;

  try {
    const res = await elasticSearchClient.delete({ index, id });
    console.log(res);
    return res;
  } catch (e: any) {
    throw new Error(e.meta ? e.meta.body.error.reason : "error");
  }
}
