import elasticSearchClient from "./common/Client";
import { genLambdaResponse } from "./common/Response";
import { ERROR_CODE } from "./types/Error";

export async function handler(data: any) {
  // From api gateway, when we call DELETE /index?index=milvus-docs
  // You can get index by data.queryStringParameters.index
  const { index } = data.queryStringParameters.index;
  try {
    const res = await elasticSearchClient.indices.delete({ index });
    return genLambdaResponse(ERROR_CODE.SUCCESS, res);
  } catch (e: any) {
    return genLambdaResponse(
      ERROR_CODE.BAD_REQUEST,
      e.meta ? e.meta.body.error.reason : "Delete Index Error"
    );
  }
}
