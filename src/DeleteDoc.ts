import elasticSearchClient from "./common/Client";
import { genLambdaResponse } from "./common/Response";
import { ERROR_CODE } from "./types/Error";

export async function handler(data: any) {
  // From api gateway, when we call DELETE /index/doc?index=milvus-docs&id=milvus.md
  // You can get index and id by data.queryStringParameters.index
  const { index, id } = data.queryStringParameters || {};
  try {
    const res = await elasticSearchClient.delete({ index, id });
    return res;
  } catch (e: any) {
    return genLambdaResponse(
      ERROR_CODE.SUCCESS,
      e.meta ? e.meta.body.error.reason : "Delete single doc failed"
    );
  }
}
